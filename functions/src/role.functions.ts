import { onDocumentWritten } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { COLLECTIONS } from "./core/config";

const auth = admin.auth();

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