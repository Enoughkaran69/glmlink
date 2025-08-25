// lib/firestore.js
import { db } from "./firebase";
import {
  getDocs, getDoc, collection, doc, query, where,
} from "firebase/firestore";

export async function getAllReels() {
  const snap = await getDocs(collection(db, "reels"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Firestore "in" operator supports up to 10 items per query.
// We'll chunk product_ids if there are more.
function chunk(arr, size = 10) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

export async function getProductsForReel(reelId) {
  const rref = doc(db, "reels", reelId);
  const rsnap = await getDoc(rref);
  if (!rsnap.exists()) return [];

  const data = rsnap.data();
  const ids = Array.isArray(data.product_ids) ? data.product_ids : [];
  if (ids.length === 0) return [];

  const batches = chunk(ids, 10);
  const results = [];

  for (const batch of batches) {
    const q = query(collection(db, "products"), where("__name__", "in", batch));
    const psnap = await getDocs(q);
    results.push(...psnap.docs.map(d => ({ id: d.id, ...d.data() })));
  }
  return results;
}
export async function getAllProducts() {
  const snap = await getDocs(collection(db, "products"));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getReelById(reelId) {
  const rref = doc(db, "reels", reelId);
  const rsnap = await getDoc(rref);
  if (!rsnap.exists()) return null;
  return { id: rsnap.id, ...rsnap.data() };
}

export async function getReelsByIds(reelIds) {
  if (!reelIds || reelIds.length === 0) return [];
  const batches = chunk(reelIds, 10);
  const results = [];
  for (const batch of batches) {
    const q = query(collection(db, "reels"), where("__name__", "in", batch));
    const psnap = await getDocs(q);
    results.push(...psnap.docs.map(d => ({ id: d.id, ...d.data() })));
  }
  return results;
}