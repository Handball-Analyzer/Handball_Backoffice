import { serverUrl } from '$lib/Store';
import type { Club, ClubDetails } from '$lib/types/Club';
import type { createGymDto } from '$lib/types/Gym';
import type { UUID } from 'crypto';
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

export async function createGym(token: string, clubId: UUID, gym: createGymDto) {
	const serverURL = get(serverUrl);
	const response = await fetch(serverURL + '/clubgym/' + clubId , {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		},
		body: JSON.stringify({
			name: gym.name,
			housenumber: gym.housenumber,
			location: gym.location,
			plz: gym.plz,
			street: gym.street
		})
	});
	return response.status;
}
