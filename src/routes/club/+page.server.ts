
import type { PageServerLoad } from './$types';
import type { Club } from '$lib/types/Club';

// Load function
export const load = (async () => {

	const respone = await fetch('http://localhost:8080/backoffice/club/getAll');
	const statuscode = respone.status;
	if (statuscode != 200) {
		return {
			statuscode: statuscode,
			clubData: []
		};
	} else {
		const clubData: Club[] = await respone.json();
		console.log(respone);
		return {
			statuscode: statuscode,
			clubData: clubData
		};
	}
}) satisfies PageServerLoad;
