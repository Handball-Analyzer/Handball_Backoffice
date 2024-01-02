import type { UUID } from 'crypto';

export type User = {
	id: UUID;
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
