import { openDB } from 'idb';

const DB_NAME = 'adminAuthDB';
const STORE_NAME = 'auth';

export async function initDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    }
  });
}

export async function setAuthData(key, value) {
  const db = await initDB();
  await db.put(STORE_NAME, value, key);
}

export async function getAuthData(key) {
  const db = await initDB();
  return db.get(STORE_NAME, key);
}

export async function removeAuthData(key) {
  const db = await initDB();
  await db.delete(STORE_NAME, key);
}

export async function clearAllAuthData() {
  const db = await initDB();
  await db.clear(STORE_NAME);
}
