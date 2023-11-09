import { writable } from "svelte/store";
export const data = writable([
  { username: "Johnny", password: "Johnny12345?" },
]);
export const MyUser = writable("");
export const StoredUserInfo = writable({ username: "", avatar_url: "", bio: "" })
export const gamesSortedData = writable([]);
export const gameCategories = writable([]);
export const gamesDataHome = writable([]);
export const searchGameData = writable([]);
