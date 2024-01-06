import type { UUID } from 'crypto';
import type { Team } from './Team';
import type { Club } from './Club';

export type User = {
	id: UUID ;
	email: string;
	firstname: string;
	lastname: string;
	gender: string | null;
	role: string;
	active: boolean;
};

export type createUserDto = {
	firstname: string;
	lastname: string;
	password: string;
	email: string;
	clubId: UUID | null;
};

export type UserDetails = {
	Teams: Team[];
	Clubs: Club[];
};
