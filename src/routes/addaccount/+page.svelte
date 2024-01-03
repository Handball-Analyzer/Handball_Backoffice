<script lang="ts">
	import type { createUserDto } from '$lib/types/User';
	import { onMount } from 'svelte';
	import { createUser, getAllCLubs } from './request';
	import { get } from 'svelte/store';
	import { token } from '$lib/Store';
	import type { Club } from '$lib/types/Club';
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { createToast } from '$lib/Toast';
	initializeStores();
	const toastStore = getToastStore();

	let clubData: Club[] = [];

	let user: createUserDto = {
		firstname: '',
		lastname: '',
		email: '',
		password: '',
		clubId: null
	};

	onMount(async () => {
		clubData = await getAllCLubs(get(token));
	});
	async function handleSubmit() {
		const response = await createUser(user, get(token));
		if (response == 200) {
			toastStore.trigger(createToast('User created', 'success'));
		} else {
			toastStore.trigger(createToast('We run into a problem', 'error'));
		}
	}
</script>

<Toast />
<main class="flex items-center ml-[35vw] justify-start float-none w-[30vw] h-[90vh]">
	<div class="card p-2">
		<form>
			<h1 class="h3">Add Account</h1>
			<label>
				<span>Firstname</span>
				<input
					bind:value={user.firstname}
					name="firstname"
					class="input"
					type="text"
					placeholder="Max"
				/>
			</label>
			<label>
				<span>Lastname</span>
				<input
					bind:value={user.lastname}
					name="lastname"
					class="input"
					type="text"
					placeholder="Mustermann"
				/>
			</label>
			<label>
				<span>Email</span>
				<input
					bind:value={user.email}
					name="email"
					class="input"
					type="email"
					placeholder="max.mustermann@test.com"
				/>
			</label>
			<label>
				<span>Password</span>
				<input
					bind:value={user.password}
					name="password"
					class="input"
					type="text"
					placeholder="asdfg"
				/>
			</label>
			<label>
				<span>Club</span>
				<select bind:value={user.clubId} name="Club" id="Club" class="select">
					<option value={null}>-- Optionen --</option>
					{#each clubData as club}
						<option value={club.id}>{club.name}</option>
					{/each}
				</select>
			</label>
			<button
				on:click={handleSubmit}
				class="btn variant-filled-primary float-right mt-3"
				type="submit">Send</button
			>
		</form>
	</div>
</main>

<style>
</style>
