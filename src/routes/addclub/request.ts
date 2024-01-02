import { serverUrl } from "$lib/Store";
import type { Club, ClubCreateDto } from "$lib/types/Club";
import { get } from "svelte/store";


export async function createClub(token:string, club:ClubCreateDto) {
    const serverURL = get(serverUrl);
    const response = await fetch(serverURL + "/clubs", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(club),
    });
    return response.status
}

export async function getClubs(token:string) {
    let clubs:Club[] = [];
    const serverURL = get(serverUrl);
    const response = await fetch(serverURL + "/clubs", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        },
    });
    clubs = await response.json();
    return clubs
}