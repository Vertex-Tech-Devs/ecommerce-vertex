"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.onRoleChange = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const logger = __importStar(require("firebase-functions/logger"));
const admin = __importStar(require("firebase-admin"));
const config_1 = require("./core/config");
const auth = admin.auth();
/**
 * Triggered when a document is written in the 'admin_roles' collection.
 * Sets the corresponding custom claim on the user's auth token.
 */
exports.onRoleChange = (0, firestore_1.onDocumentWritten)(`${config_1.COLLECTIONS.ADMIN_ROLES}/{email}`, async (event) => {
    const email = event.params.email;
    const afterData = event.data?.after.data();
    let user;
    try {
        user = await auth.getUserByEmail(email);
    }
    catch (error) {
        if (error.code === 'auth/user-not-found') {
            logger.warn(`User with email ${email} not found in Firebase Auth.`);
        }
        else {
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
//# sourceMappingURL=role.functions.js.map