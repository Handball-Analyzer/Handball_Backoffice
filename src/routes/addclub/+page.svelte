<script lang="ts">
	import { token } from "$lib/Store";
	import type { ClubCreateDto } from "$lib/types/Club";
	import { onMount } from "svelte";
	import { get } from "svelte/store";
	import { createClub } from "./request";
	import { Toast, getToastStore } from '@skeletonlabs/skeleton';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { createToast } from "$lib/Toast";
	initializeStores();
	const toastStore = getToastStore();

		let club: ClubCreateDto =  {
		plz: 0,
		name: "",
		street: "",
		housenumber: 0,
		location: "",
	
	}
	onMount(async () => {
	});

	async function handleSubmit( ) {
		const response = await createClub(get(token), club);
		if (response == 200) {
			toastStore.trigger(createToast("Club created", "success"));
		} else {
			toastStore.trigger(createToast("We run into a problem", "error"));
		}
	}
	function filterList(){
		
	}

</script>

<Toast />
<main class="flex items-center ml-[35vw] justify-start float-none w-[30vw] h-[90vh]">
	<div class="card p-2">
		<form>
			<h1 class="h3">Add Club</h1>
			<label>
				<span>Name</span>
				<input bind:value={club.name} name="name" class="input" type="text" placeholder="TSV Musterhausen" />
			</label>
			<label>
				<span>PLZ</span>
				<input bind:value={club.plz} name="plz" class="input" type="number" placeholder="70730" />
			</label>
			<label>
				<span>Place</span>
				<input bind:value={club.location} name="location" class="input" type="text" placeholder="Musterhausen" />
			</label>
			<label>
				<span>Street</span>
				<input bind:value={club.street} name="street" class="input" type="text" placeholder="Musterstraße" />
			</label>
			<label>
				<span>Housenumber</span>
				<input bind:value={club.housenumber} name="housenumber" class="input" type="number" placeholder="13" />
			</label>
			<button on:click={handleSubmit} class="btn variant-filled-primary float-right mt-3" type="submit">Send</button>
		</form>
	</div>
</main>

<style>
</style>
