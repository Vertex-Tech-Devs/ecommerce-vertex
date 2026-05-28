import { onDocumentWritten } from "firebase-functions/v2/firestore";
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