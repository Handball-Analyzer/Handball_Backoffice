import type { User } from '$lib/types/User';
import type { PageServerLoad} from './$types';

// Load function
export const load = (async () => {

	let allUserData: User[] = [];
	const res = await fetch('http://localhost:8080/backoffice/user/getAll');
	allUserData = await res.json();

	return {
		allUserData: allUserData
	};
}) satisfies PageServerLoad;
