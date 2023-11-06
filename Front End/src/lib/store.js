import {writable} from 'svelte/store'

export const data = writable([{username : "Johnny", password: "Johnny12345?"}])
export const MyUser = writable("")