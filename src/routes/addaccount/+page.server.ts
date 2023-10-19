import type { ClubName } from '$lib/types/Club';
import { redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import type { createUserDto } from '$lib/types/User';


// Load function
export const load = (async ({locals}) => {
    const session = await locals.getSession();
if (!session?.user) throw redirect(303, '/auth/signin');

    let resAllClubNames = [];
    let allClubNames:ClubName[] = [];

    const res = await  fetch("http://localhost:8080/backoffice/club/getAll");
    resAllClubNames = await res.json();

	return {
        allClubNames: resAllClubNames

	};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createUser: async ({request, locals}) =>{
		const formData = await request.formData()
        const club_id = formData.get('Club')?.toString()
        const userdata:createUserDto = {
            id: null,
            firstName: formData.get('firstname')?.toString() ?? '',
            lastName: formData.get('lastname')?.toString()?? '',
            gender: null,
            email: formData.get('email')?.toString()?? '',
            password: formData.get('password')?.toString()?? '',
            active: true,
            role: "Trainer",
            club_id: formData.get('Club')?.toString() ?? null
        }

        fetch('http://localhost:8080/backoffice/user/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userdata),
            cache: 'default'
          })



	}
	
	
} satisfies Actions;


