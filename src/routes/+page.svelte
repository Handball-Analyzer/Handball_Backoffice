<script lang="ts">
	import { authserverUrl, token } from '$lib/Store';
	import type { Auth } from '$lib/types/Auth';
	import { Toast } from '@skeletonlabs/skeleton';
	import { get } from 'svelte/store';
	import { goto } from '$app/navigation';
	import { createToast } from '$lib/Toast';
	
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	const toastStore = getToastStore();

	let authData: Auth = {
		email: '',
		password: ''
	};

	async function handleSubmit() {
		console.log(authData);
		const serverURL = get(authserverUrl);
		const response = await fetch('http://localhost:8080/auth/v1/backoffice/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(authData)
		});
		if
		(response.ok) {
			const data:string = await response.text();
			token.set(data);
			goto('/dashboard');
		} else {
			toastStore.trigger(createToast("Email or password incorrect", "error"))
			console.log('error');
		}
	}
</script>

<Toast />
<form method="get">
	<main class="flex justify-center items-center mt-8">
		<div class="card flex flex-col justify-center items-center h-[60vh] w-[50vw]">
			<div class="flex flex-col h-3/5 w-4/6 justify-around items-center">
				<h1 class="h1">Login</h1>
				<input class="input" type="text" placeholder="Email" bind:value={authData.email} />
				<input
					class="input"
					type="password"
					placeholder="Password"
					bind:value={authData.password}
				/>
				<button class="btn variant-filled" on:click={handleSubmit} type="submit">Login</button>
			</div>
		</div>
	</main>
</form>

<style lang="postcss">
</style>
