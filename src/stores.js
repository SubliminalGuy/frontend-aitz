import { writable } from "svelte/store";

export const modalClicked = writable(false);

export const userComments = writable([1, 2]);

export const supaBlogPosts = writable([]);

export const isAuthenticated = writable(false);
