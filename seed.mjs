// /seed.mjs
// This script reads your seed-data.json file and uploads it to Firestore.
// To run it, open your terminal in the project root and type: node seed.mjs

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// --- IMPORTANT ---
// To run this script, you must first create your service account JSON file.
// 1. Go to Firebase Console > Project Settings > Service accounts.
// 2. Click "Generate new private key" and save the file.
// 3. Rename the downloaded file to `serviceAccountKey.json` and place it in your project root.
// 4. Make sure this file is listed in your .gitignore so it's never uploaded to GitHub.
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize the Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const experiencesData = JSON.parse(readFileSync('./seed-data.json', 'utf8'));

async function seedDatabase() {
  const experiencesCollection = db.collection('experiences');
  console.log('Starting to seed experiences...');

  for (const experience of experiencesData) {
    try {
      // Add the createdAt timestamp to each record
      const experienceWithTimestamp = {
        ...experience,
        createdAt: new Date() // Use current date for seeding
      };
      
      await experiencesCollection.add(experienceWithTimestamp);
      console.log(`✅ Added experience: "${experience.translations.en.title}"`);
    } catch (error) {
      console.error(`❌ Error adding experience "${experience.translations.en.title}":`, error);
    }
  }

  console.log('\nDatabase seeding complete!');
}

seedDatabase();
