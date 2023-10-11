import type { ClubName } from '$lib/types/Club';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';


// Load function
export const load = (async ({locals}) => {
    const session = await locals.getSession();
if (!session?.user) throw redirect(303, '/auth/signin');

    let resAllClubNames = [];
    let allClubNames:ClubName[] = [];

    const res = await  fetch("http://localhost:8080/backoffice/allClubNames");
    resAllClubNames = await res.json();


    resAllClubNames.forEach((element: any) => {
        let club:ClubName = {
           id: element[0],
           name: element[1]

        }
        allClubNames.push(club)

        
    });

	return {
        allClubNames: allClubNames

	};
}) satisfies PageServerLoad;


