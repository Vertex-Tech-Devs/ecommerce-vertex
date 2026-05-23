import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as functions from "firebase-functions/v1";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { COLLECTIONS } from "./core/config";

const auth = admin.auth();
const db = admin.firestore();

/**
 * Triggered when a document is written in the 'admin_roles' collection.
 * Sets the corresponding custom claim on the user's auth token.
 */
export const onRoleChange = onDocumentWritten(`${COLLECTIONS.ADMIN_ROLES}/{email}`, async (event) => {
  const email = event.params.email;
  const afterData = event.data?.after.data();

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
  
  if (!afterData || afterData.role !== 'admin') {
    logger.info(`Revoking 'admin' claim for user: ${email} (UID: ${user.uid})`);
    await auth.setCustomUserClaims(user.uid, { admin: false });
    return;
  }

  if (afterData.role === 'admin') {
    if (event.data?.before.data()?.role === 'admin') {
      logger.info(`Admin role for ${email} already set. No change needed.`);
      return;
    }
    
    logger.info(`Setting 'admin' claim for user: ${email} (UID: ${user.uid})`);
    await auth.setCustomUserClaims(user.uid, { admin: true });
    return;
  }
});

/**
 * Triggered when a new user is created in Firebase Auth.
 * If their email is pre-configured as an admin in the 'admin_roles' collection,
 * sets the admin custom claim on their account immediately.
 */
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  if (!user || !user.email) return;

  const email = user.email;
  try {
    const doc = await db.collection(COLLECTIONS.ADMIN_ROLES).doc(email).get();
    if (doc.exists && doc.data()?.role === 'admin') {
      logger.info(`Setting 'admin' claim for newly registered user: ${email} (UID: ${user.uid})`);
      await auth.setCustomUserClaims(user.uid, { admin: true });
    }
  } catch (error) {
    logger.error(`Error setting admin claim on user creation for ${email}:`, error);
  }
});