// /seed-articles.mjs
// This script reads your seed-articles.json file and uploads it to Firestore.
// To run it, open your terminal in the project root and type: node seed-articles.mjs

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// This script requires your service account key.
// Make sure `serviceAccountKey.json` is in your project root.
const serviceAccount = JSON.parse(readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize the Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
const articlesData = JSON.parse(readFileSync('./seed-articles.json', 'utf8'));

async function seedBlog() {
  const articlesCollection = db.collection('articles');
  console.log('Starting to seed articles...');

  for (const article of articlesData) {
    try {
      // Add the createdAt timestamp to each record
      const articleWithTimestamp = {
        ...article,
        createdAt: new Date() // Use current date for seeding
      };
      
      await articlesCollection.add(articleWithTimestamp);
      console.log(`✅ Added article: "${article.translations.en.title}"`);
    } catch (error) {
      console.error(`❌ Error adding article "${article.translations.en.title}":`, error);
    }
  }

  console.log('\nBlog seeding complete!');
}

seedBlog();
