<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	import { createGym, getClubs } from '../../routes/club/request';
	import { get } from 'svelte/store';
	import { serverUrl, token } from '$lib/Store';
	import type { Club } from '$lib/types/Club';
	import { addClubfromUser } from '../../routes/accounts/request';
	import type { UUID } from 'crypto';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { createGymDto } from '$lib/types/Gym';

	let gym: createGymDto = {
		name: '',
		plz: 0,
		location: '',
		street: '',
		housenumber: 0
	};

	export let parent: SvelteComponent;
	const modalStore = getModalStore();
	const clubId: UUID = $modalStore[0].meta.clubId;

	onMount(async () => {});

	async function handleSubmit() {
		console.log(gym);
		console.log(clubId);
		const response = await createGym(get(token),clubId, gym)
		console.log(response)
		if(response == 201){
		    modalStore.close()
		    //window.location.reload()
		}
	}
</script>

<main class="card p-3">
	<header>
		<h2>Create Gym by Club</h2>
	</header>
	<section class="flex justify-around items-center flex-col m-2">
		<label class="label w-11/12">
			<span>Name:</span>

			<input bind:value={gym.name} class="input mt-2" type="text" placeholder="Spielhalle" />
		</label>
		<label class="label w-11/12 ">
			<span>Postleitzahl:</span>

			<input bind:value={gym.plz} class="input mt-2" type="text" placeholder="707070" />
		</label>
		<label class="label w-11/12">
			<span>City:</span>

			<input bind:value={gym.location} class="input mt-2" type="text" placeholder="Musterstadt" />
		</label>
		<label class="label w-11/12">
			<span>street:</span>
			<input bind:value={gym.street} class="input mt-2" type="text" placeholder="Musterstr." />
		</label>
		<label class="label w-11/12">
			<span>housenumber:</span>
			<input
				bind:value={gym.housenumber}
				class="input mt-2"
				type="text"
			/>
		</label>
	</section>

	<footer>
		<button class="btn variant-filled-primary" on:click={handleSubmit}>Add</button>
	</footer>
</main>
