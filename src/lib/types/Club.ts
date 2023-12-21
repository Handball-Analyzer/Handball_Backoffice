import type { UUID } from 'crypto';

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
