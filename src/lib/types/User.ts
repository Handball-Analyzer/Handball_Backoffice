import type { UUID } from 'crypto';

export type User = {
	id: UUID;
	firstname: string;
	lastname: string;
	gender: string | null;
	password: string;
	email: string;
	role: string;
	active: Boolean;
};

export type createUserDto = {
	id: null;
	firstName: string;
	lastName: string;
	gender: null;
	password: string;
	email: string;
	role: string;
	active: Boolean;
	club_id: String | null;
};
