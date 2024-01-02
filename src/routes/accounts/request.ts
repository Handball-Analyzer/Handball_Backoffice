import type { UUID } from 'crypto';
import type { User } from "$lib/types/User";
import { get } from 'svelte/store';
import { serverUrl } from '$lib/Store';

export async function loadData(token:string){
    //const serverURL:string = get(serverUrl);
	let  allUserData: User[] = [];
	const res = await fetch(get(serverUrl)+ "/user" , {
		method: 'GET',
		headers: {
			'Authorization': 'Bearer ' + token,
		}
	});
	//console.log('res: ', res);
    console.log('Code: ', res.status);
    allUserData = await res.json();
    return allUserData
}



export async function changeActiveUser(id: UUID, token:string) {
    
	const respsone = await fetch(get(serverUrl)+'/user/' + id + '/changeactive', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
            'authorization': 'Bearer ' + token
		},
		cache: 'default'
	});
    console.log('Code: ', respsone.status);
    return respsone.status
}
