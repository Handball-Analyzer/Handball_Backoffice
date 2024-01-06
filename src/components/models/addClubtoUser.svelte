<script lang="ts">
	import { SvelteComponent, onMount } from 'svelte';
	import { getClubs } from '../../routes/club/request';
	import { get } from 'svelte/store';
	import { serverUrl, token } from '$lib/Store';
	import type { Club } from '$lib/types/Club';
	import { addClubfromUser } from '../../routes/accounts/request';
	import type { UUID } from 'crypto';
	import { getModalStore } from '@skeletonlabs/skeleton';

	let clubData: Club[] = [];
	export let parent: SvelteComponent;
    const modalStore = getModalStore()
    let clubId:UUID;
    const userId:UUID = $modalStore[0].meta.userId
    console.log(userId)

	onMount(async () => {
		clubData = await getClubs(get(token));
        const data = parent
        console.log(data)
	});

    async function handleSubmit() {
        const response = await addClubfromUser(get(token),clubId,userId)
        console.log(response)
        if(response == 201){
            modalStore.close()
            window.location.reload()
        }
        
  }
</script>

<main class="card p-3">
	<header class="card-header">
		<h2 class="h4">Add Club to user</h2>
	</header>
	<section class="m-4">
		<select class="select" name="" id="" bind:value={clubId}>
			{#each clubData as club}
				<option value={club.id}>{club.name}</option>
			{/each}
		</select>
	</section>
	<footer class="card-footer">
		<button on:click={handleSubmit} class=" float-right btn variant-filled-primary"> Add</button>
	</footer>
</main>
