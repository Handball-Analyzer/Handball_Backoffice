<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import Gym from '../../lib/data/Gym.json';
	import type { Club } from '$lib/types/Club';
	import type { PageData } from './$types';

	const teams = [
		{ UUID: 123456, gender: 'g', age_group: 'E', Coach: 'Felix Link', number: 1 },
		{ UUID: 123456, gender: 'm', age_group: 'D', Coach: 'Felix Link', number: 1 },
		{ UUID: 123456, gender: 'm', age_group: 'C', Coach: 'Felix Link', number: 2 },
		{ UUID: 123456, gender: 'm', age_group: 'C', Coach: 'Felix Link', number: 1 },
		{ UUID: 123456, gender: 'm', age_group: 'B', Coach: 'Felix Link', number: 2 },
		{ UUID: 123456, gender: 'm', age_group: 'A', Coach: 'Felix Link', number: 2 },
		{ UUID: 123456, gender: 'w', age_group: 'Z', Coach: 'Felix Link', number: 2 }
	];

	export let data: PageData;
	const clubData: any = data.clubData;
	const gyms = Gym;
	let selecet_Club: Club = {
		id: null,
		name: '',
		plz: 0,
		location: '',
		street: '',
		housenumber: 0
	};

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['UUID', 'Name'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(clubData, ['id', 'name']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(clubData, ['id', 'name', 'plz', 'location', 'street', 'housenumber']),
		// Optional: A list of footer labels.
		foot: ['Total', '<code class="code">' + clubData.length + '</code>']
	};

	function test(event: { detail: any }) {
		let seleceted_row = event.detail;
		selecet_Club = {
			id: seleceted_row[0],
			name: seleceted_row[1],
			plz: seleceted_row[2],
			location: seleceted_row[3],
			street: seleceted_row[4],
			housenumber: seleceted_row[5]
		};
	}

	let tabSet: number = 0;
</script>

<main class="m-3">
	<div class="flex flex-row w-screen justify-between">
		<h1 class="h2">Accounts</h1>
		<a href="/addclub"><button class="btn variant-filled-primary mr-[5vw]">Add New</button></a>
	</div>
	<div class="flex flex-row items-top h-[60vh]">
		<div class="w-1/2 h-full m-2">
			<div class="flex flex-row justify-between mb-1">
				<h3 class="h3">List of all Clubs</h3>
				<input class="input w-1/2 h-1/6" type="search" placeholder="Search..." />
			</div>
			<Table
				class="h-[54vh] overflow-scroll"
				interactive={true}
				on:selected={test}
				source={tableSimple}
			/>
		</div>
		<div class="w-1/2 h-full m-2">
			<div class="h-full">
				<h1 class="h3">Club Detail View</h1>
				<TabGroup>
					<Tab bind:group={tabSet} name="tab1" value={0}>General</Tab>
					<Tab bind:group={tabSet} name="tab2" value={1}>Hallen</Tab>
					<Tab bind:group={tabSet} name="tab3" value={2}>Ansprechpartner</Tab>
					<Tab bind:group={tabSet} name="tab3" value={3}>Teams</Tab>
					<Tab bind:group={tabSet} name="tab3" value={4}>Extensions</Tab>
					<Tab bind:group={tabSet} name="tab3" value={5}>Abo</Tab>
					<!-- Tab Panels --->
					<svelte:fragment slot="panel">
						{#if tabSet === 0}
							<div class="flex flex-col w-full">
								<div class="flex flex-row">
									<label class="label w-1/2">
										<span>UUID:</span>
										<input
											bind:value={selecet_Club.id}
											class="input"
											type="text"
											placeholder="Input"
											disabled
										/>
									</label>
								</div>
								<div class="flex flex-row mt-[2vh]">
									<label class="label">
										<span>Name:</span>
										<input
											bind:value={selecet_Club.name}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
									<label class="label ml-[3vw]">
										<span>Adress:</span>
										<input
											bind:value={selecet_Club.location}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
								</div>
							</div>
						{:else if tabSet === 1}
							<dl class="list-dl">
								{#each gyms as gym}
									<div>
										<span class="flex-auto">
											<dt>{gym.Halle}</dt>
											<dd>{gym.Adress}</dd>
										</span>
									</div>
								{/each}

								<!-- ... -->
							</dl>
						{:else if tabSet === 2}
							<p>Tab 2</p>
						{:else if tabSet === 3}
							<div class="overflow-scroll h-[47vh]">
								<dl class="list-dl">
									{#each teams as team}
										<div>
											<span class="flex-auto">
												<dt>{team.gender + team.age_group + team.number}</dt>
												<dd>{team.Coach}</dd>
											</span>
										</div>
									{/each}

									<!-- ... -->
								</dl>
							</div>
						{:else if tabSet === 4}
							<p>Tab 4</p>
						{:else if tabSet === 5}
							<div class="flex flex-col">
								<div class="flex flex-row">
									<label class="label">
										<span>Disable Account:</span>
										<button on:click={() => alert('Are you sure?')} class="btn variant-filled"
											>disactivate Account</button
										>
									</label>
								</div>
							</div>
						{/if}
					</svelte:fragment>
				</TabGroup>
			</div>
			{#if selecet_Club.id != null}
				<button
					class="float-right btn variant-filled"
					on:click={() => alert('Wurde Erfolgreich gespeichert!' + selecet_Club.id)}>Save</button
				>
			{/if}
		</div>
	</div>
</main>

<style>
</style>
