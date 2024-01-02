import {  serverUrl } from "$lib/Store";
import type { createUserDto } from "$lib/types/User";
import { get } from "svelte/store"


export async function getAllCLubs(token:string) {
    const serverURL = get(serverUrl);
    const response = await fetch(serverURL + "/clubs", {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
        }
    });
    const allClubs = await response.json();
    return allClubs
}


export async function createUser(user: createUserDto, token:string) {
    const serverURL = get(serverUrl);
    const response = await fetch(serverURL + "/user/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(user),
    });
    return response.status
}