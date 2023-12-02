import type { UUID } from 'crypto';

export async function requestDisableAccount(id: UUID) {
	const respone = await fetch('http://localhost:8080/backoffice/user/disableAccount/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'default'
	});
}
export async function requestEnableAccount(id: UUID) {
	const respone = await fetch('http://localhost:8080/backoffice/user/enableAccount/' + id, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		cache: 'default'
	});
}
