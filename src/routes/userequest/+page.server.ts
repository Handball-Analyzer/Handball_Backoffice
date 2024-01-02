
import type { PageServerLoad } from './$types';

// Load function
export const load = (async () => {

    return{ test: 'test'}

}) satisfies PageServerLoad;
