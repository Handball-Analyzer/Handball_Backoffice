import type { UUID } from 'crypto';
import type { User, UserDetails } from '$lib/types/User';
import { get } from 'svelte/store';
import { serverUrl } from '$lib/Store';

export async function loadData(token: string) {
	//const serverURL:string = get(serverUrl);
	let allUserData: User[] = [];
	const res = await fetch(get(serverUrl) + '/user', {
		method: 'GET',
		headers: {
			Authorization: 'Bearer ' + token
		}
	});
	allUserData = await res.json();
	return allUserData;
}

export async function changeActiveUser(id: UUID, token: string) {
	const respsone = await fetch(get(serverUrl) + '/user/' + id + '/changeactive', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			authorization: 'Bearer ' + token
		},
		cache: 'default'
	});
	return respsone.status;
}
export async function userDetails(token: string, id: UUID) {
	const userDetails: UserDetails = { Teams: [], Clubs: [] };
	const serverURL = get(serverUrl);
	const responseClubs = await fetch(serverURL + '/userdetails/' + id + '/clubs', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	if (responseClubs.status == 200) {
		userDetails.Clubs = await responseClubs.json();
	}
	const responseTeams = await fetch(serverURL + '/userdetails/' + id + '/teams', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		}
	});
	if (responseTeams.status == 200) {
		userDetails.Teams = await responseTeams.json();
	}

	return userDetails;
}

export async function removeClubfromUser(token: string, clubId: string, userId: UUID, r: boolean) {
	const serverURL = get(serverUrl);
	if (r) {
		const response = await fetch(serverURL + "/clubuser", {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token
			},
			body: JSON.stringify({
				clubId: clubId,
				userId: userId
			})
		});
		if (await response.status == 204) {
			window.location.reload();
		}
	}
}
export async function addClubfromUser(token: string, clubID: UUID, userid: UUID|null) {
	const serverURL = get(serverUrl);

	const respone = await fetch(serverURL + "/clubuser", {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer ' + token
		},
		body: JSON.stringify({
			clubId: clubID,
			userId: userid
		})
	});
	console.log(await respone.json())
	const status = respone.status
	return status

}
