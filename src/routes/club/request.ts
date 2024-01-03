import { serverUrl } from '$lib/Store';
import type { Club, ClubDetails } from '$lib/types/Club';
import { get } from 'svelte/store';

export async function getClubs(token: string) {
	let clubs: Club[] = [];
	const serverURL = get(serverUrl);
	const response = await fetch(serverURL + '/clubs', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	clubs = await response.json();
	return clubs;
}

export async function getDetails(token: string, clubId: string) {
	const clubDetails: ClubDetails = { Teams: [], Gyms: [] };

	const serverURL = get(serverUrl);

	const responseGyms = await fetch(serverURL + '/clubdetails/' + clubId + '/gyms', {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token
		}
	});
	if (responseGyms.status == 200) {
		clubDetails.Gyms = await responseGyms.json();
	}
	return clubDetails;
}
