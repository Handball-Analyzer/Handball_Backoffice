import { persisted } from 'svelte-local-storage-store';
import { writable } from 'svelte/store';

export const token = persisted('token', '');
export const authserverUrl = writable('http://localhost:8080/auth/v1/backoffice');

export const serverUrl = writable('http://localhost:8080/backoffice/v1');
