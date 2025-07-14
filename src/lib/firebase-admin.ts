// /src/lib/firebase-admin.ts
import admin from 'firebase-admin'; // <-- THE ONLY CHANGE IS ON THIS LINE

// This prevents re-initialization in development
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.ADMIN_FIREBASE_PROJECT_ID,
      clientEmail: process.env.ADMIN_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.ADMIN_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    // --- THIS IS THE NEW LINE TO ADD ---
    // This tells the Admin SDK where to find your storage bucket.
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  });
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };