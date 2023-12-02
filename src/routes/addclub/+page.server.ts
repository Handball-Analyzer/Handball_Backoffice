import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { ClubCreateDto } from '$lib/types/Club';

// Load function
export const load = (async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) throw redirect(303, '/auth/signin');

	return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
	createClub: async ({ request, locals }) => {
		const formData = await request.formData();
		const clubData: ClubCreateDto = {
			name: formData.get('name')?.toString() ?? '',
			plz: Number(formData.get('plz')) ?? 0,
			location: formData.get('location')?.toString() ?? '',
			street: formData.get('street')?.toString() ?? '',
			housenumber: Number(formData.get('housenumber')) ?? 0
		};

		const response = await fetch('http://localhost:8080/backoffice/club/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(clubData),
			cache: 'default'
		});
	}
} satisfies Actions;
