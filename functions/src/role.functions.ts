import { onDocumentWritten } from "firebase-functions/v2/firestore";
import { onCall, HttpsError } from "firebase-functions/v2/https";
import * as functions from "firebase-functions/v1";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { COLLECTIONS } from "./core/config";

const auth = admin.auth();
const db = admin.firestore();
const AUTHORIZED_ROLES = new Set(['admin']);

/**
 * Triggered when a document is written in the 'admin_roles' collection.
 * Sets the corresponding custom claim on the user's auth token.
 */
export const onRoleChange = onDocumentWritten(`${COLLECTIONS.ADMIN_ROLES}/{email}`, async (event) => {
  const email = event.params.email;
  const afterData = event.data?.after.data();
  const nextRole = String(afterData?.role || '').trim().toLowerCase();
  const isAuthorizedRole = AUTHORIZED_ROLES.has(nextRole);

  let user: admin.auth.UserRecord;
  try {
    user = await auth.getUserByEmail(email);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      logger.warn(`User with email ${email} not found in Firebase Auth.`);
    } else {
      logger.error(`Error fetching user ${email}:`, error);
    }
    return;
  }
  
  if (!afterData || !isAuthorizedRole) {
    logger.info(`Revoking admin access for user: ${email} (UID: ${user.uid})`);
    await auth.setCustomUserClaims(user.uid, { admin: false });
    return;
  }

  if (event.data?.before.data()?.role === nextRole) {
    logger.info(`Role for ${email} already set to ${nextRole}. No change needed.`);
    return;
  }

  logger.info(`Setting admin access claims for user: ${email} (UID: ${user.uid}) role=${nextRole}`);
  await auth.setCustomUserClaims(user.uid, { admin: true, role: nextRole });
});

/**
 * Triggered when a new user is created in Firebase Auth.
 * If their email is pre-configured as an admin in the 'admin_roles' collection,
 * sets the admin custom claim on their account immediately.
 */
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  if (!user || !user.email) return;

  const email = user.email.trim().toLowerCase();
  try {
    const doc = await db.collection(COLLECTIONS.ADMIN_ROLES).doc(email).get();
    const role = String(doc.data()?.role || '').trim().toLowerCase();
    if (doc.exists && AUTHORIZED_ROLES.has(role)) {
      logger.info(`Setting admin access claims for newly registered user: ${email} (UID: ${user.uid}) role=${role}`);
      await auth.setCustomUserClaims(user.uid, { admin: true, role });
    }
  } catch (error) {
    logger.error(`Error setting admin claim on user creation for ${email}:`, error);
  }
});

/**
 * Callable that syncs admin claims for the authenticated caller.
 * Called from the login flow if the user doesn't yet have an admin claim,
 * to handle the race condition where onRoleChange ran before the user existed in Auth.
 */
export const refreshMyAdminClaim = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Must be signed in.');
  }

  const email = request.auth.token['email'];
  if (!email) {
    throw new HttpsError('invalid-argument', 'User account has no email.');
  }

  const uid = request.auth.uid;
  const doc = await db.collection(COLLECTIONS.ADMIN_ROLES).doc(String(email).trim().toLowerCase()).get();
  const role = String(doc.data()?.role || '').trim().toLowerCase();

  if (doc.exists && AUTHORIZED_ROLES.has(role)) {
    logger.info(`refreshMyAdminClaim: granting admin claim to ${email} (UID: ${uid})`);
    await auth.setCustomUserClaims(uid, { admin: true, role });
    return { granted: true };
  }

  logger.info(`refreshMyAdminClaim: no admin_roles entry for ${email}`);
  return { granted: false };
});