<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { writable } from 'svelte/store';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
	<svelte:fragment slot="lead"
		><img
			class="h-8 aspect-auto"
			src="handball-analyser-low-resolution-logo-white-on-transparent-background.png"
			alt="Logo: Handball-Analyser"
		/></svelte:fragment
	>
	<div class="p-5 flex flex-row justify-around w-[40vw]">
		<a href="/">Home</a>
		<a href="/accounts">Customer</a>
		<a href="/club">Club</a>
		<a hidden href="/statistics">Statistics</a>
		<a href="/support">Support</a>
		<a href="/userequest">Use requst</a>
	</div>

</AppBar>

<style lang="postcss">
</style>
