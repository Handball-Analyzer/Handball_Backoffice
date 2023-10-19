import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { Club } from '$lib/types/Club';


// Load function
export const load = (async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/signin');

	let clubData:Club

	const respone = await fetch('http://localhost:8080/backoffice/club/getAll')
	clubData = await respone.json()
	
	
    

	return {
		clubData:clubData

	};
}) satisfies PageServerLoad;