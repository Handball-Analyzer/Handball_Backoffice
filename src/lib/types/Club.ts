import type { UUID } from 'crypto';
import type { Team } from './Team';
import type { Gym } from './Gym';

export type ClubName = {
	id: UUID;
	name: string;
};
export type ClubCreateDto = {
	name: string;
	plz: number;
	location: string;
	street: string;
	housenumber: number;
};
export type Club = {
	id: UUID | null;
	name: string;
	plz: number;
	location: string;
	street: string;
	housenumber: number;
};

export type ClubDetails = {
	Teams: Team[];
	Gyms: Gym[];
};
