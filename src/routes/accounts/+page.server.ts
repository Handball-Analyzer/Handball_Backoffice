import type { User } from '$lib/types/User';
import type { PageServerLoad, Actions } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';


// Load function
export const load = (async ({locals}) => {
    const session = await locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/signin');

    var allUserData:User[] = [];
    const res = await  fetch("http://localhost:8080/backoffice/user/getAll");
    allUserData = await res.json()

	return {
        allUserData: allUserData
	};
}) satisfies PageServerLoad;




