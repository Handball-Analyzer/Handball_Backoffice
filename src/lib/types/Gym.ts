import type { UUID } from 'crypto';

export type Gym = {
	id: UUID;
	name: string;
	housenumber: number;
	location: string;
	plz: number;
	street: string;
};
