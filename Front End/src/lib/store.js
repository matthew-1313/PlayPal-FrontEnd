import { writable } from "svelte/store";
import {db} from '../lib/firebase/firebase.client'
import { getDoc, doc } from "firebase/firestore";

export const data = writable([
  { username: "Johnny", password: "Johnny12345?" },
]);
export const MyUser = writable("");
export const StoredUserInfo = writable({});
export const gamesSortedData = writable([]);
export const gameCategories = writable([]);
export const gamesDataHome = writable([]);
export const searchGameData = writable([]);
export const currentChatSession = writable({})
export async function getDocument (coll, id) {
  const snap = await getDoc(doc(db, coll, id))
  if (snap.exists()){
    return snap.data()
   } else{
    return Promise.reject(Error(`No such document: ${coll}.${id}`))
   }
}
export function deepEqual(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      areObjects && !deepEqual(val1, val2) ||
      !areObjects && val1 !== val2
    ) {
      return false;
    }
  }

  return true;
}