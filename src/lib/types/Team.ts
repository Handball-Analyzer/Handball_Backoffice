import type { UUID } from 'crypto';

export type Team = {
	id: UUID;
	agegroup: string;
	gender: string;
	number: number;
	season: string;
	clubId: UUID;
};
