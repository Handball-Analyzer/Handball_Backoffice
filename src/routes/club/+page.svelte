<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { Club, ClubDetails } from '$lib/types/Club';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { token } from '$lib/Store';
	import { getClubs, getDetails } from './request';

	let filtervalue: string = '';
	let clubDetails: ClubDetails = { Teams: [], Gyms: [] };

	let clubData: Club[] = [];
	onMount(async () => {
		clubData = await getClubs(get(token));
		tableSimple.body = tableMapperValues(clubData, ['id', 'name']);
		tableSimple.meta = tableMapperValues(clubData, [
			'id',
			'name',
			'plz',
			'location',
			'street',
			'housenumber'
		]);
		tableSimple.foot = ['Total', '<code class="code">' + clubData.length + '</code>'];
	});

	let selectedClub: Club = {
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
		body: tableMapperValues(clubData, ['id', 'name'])
	};

	async function selectedRow(event: { detail: any }) {
		clubDetails = await getDetails(get(token), event.detail[0]);
		let selectedRow = event.detail;
		selectedClub = {
			id: selectedRow[0],
			name: selectedRow[1],
			plz: selectedRow[2],
			location: selectedRow[3],
			street: selectedRow[4],
			housenumber: selectedRow[5]
		};
	}
	function tablefilter() {
		let filter = filtervalue.toLowerCase();
		const filterData = clubData.filter((row) => {
			return row.name.toLowerCase().includes(filter);
		});
		tableSimple.body = tableMapperValues(filterData, ['id', 'name']);
		tableSimple.foot = ['Total', '<code class="code">' + filterData.length + '</code>'];
	}

	let tabSet: number = 0;
</script>

<main class="m-3">
	<div class="flex flex-row w-screen justify-between">
		<h1 class="h2">Club</h1>
		<a href="/addclub"><button class="btn variant-filled-primary mr-[5vw]">Add New</button></a>
	</div>
	<div class="flex flex-row items-top h-[60vh]">
		<div class="w-1/2 h-full m-2">
			<div class="flex flex-row justify-between mb-1">
				<h3 class="h3">List of all Clubs</h3>
				<input
					on:change={tablefilter}
					bind:value={filtervalue}
					class="input w-1/2 h-1/6"
					type="search"
					placeholder="Search..."
				/>
			</div>
			<Table
				class="h-[54vh] overflow-scroll"
				interactive={true}
				on:selected={selectedRow}
				source={tableSimple}
			/>
		</div>
		<div class="w-1/2 h-full m-2">
			<div class="h-full">
				<h1 class="h3">Club Detail View</h1>
				<TabGroup>
					<Tab bind:group={tabSet} name="tab1" value={0}>General</Tab>
					<Tab bind:group={tabSet} name="tab2" value={1}>Adresse</Tab>
					<Tab bind:group={tabSet} name="tab2" value={2}>Hallen</Tab>
					<Tab bind:group={tabSet} name="tab3" value={3}>Ansprechpartner</Tab>
					<Tab bind:group={tabSet} name="tab3" value={4}>Teams</Tab>
					<Tab bind:group={tabSet} name="tab3" value={5}>Extensions</Tab>
					<Tab bind:group={tabSet} name="tab3" value={6}>Abo</Tab>
					<!-- Tab Panels --->
					<svelte:fragment slot="panel">
						{#if tabSet === 0}
							<div class="flex flex-col w-full">
								<div class="flex flex-row">
									<label class="label w-1/2">
										<span>UUID:</span>
										<input
											bind:value={selectedClub.id}
											class="input"
											type="text"
											placeholder="Input"
											disabled
										/>
									</label>
								</div>
								<div class="flex flex-row mt-[2vh]">
									<label class="label w-1/2">
										<span>Name:</span>
										<input
											bind:value={selectedClub.name}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
								</div>
							</div>
						{:else if tabSet === 1}
							<div class="flex flex-col w-full">
								<div class="flex flex-row">
									<label class="label w-2/5">
										<span>Postleitzahl</span>
										<input
											bind:value={selectedClub.plz}
											class="input"
											type="text"
											placeholder="Input"
											disabled
										/>
									</label>
									<label class="label w-2/5 ml-2">
										<span>Ort</span>
										<input
											bind:value={selectedClub.location}
											class="input"
											type="text"
											placeholder="Input"
											disabled
										/>
									</label>
								</div>
								<div class="flex flex-row mt-[2vh]">
									<label class="label w-2/5">
										<span>Straße</span>
										<input
											bind:value={selectedClub.street}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
									<label class="label w-2/5 ml-2">
										<span>Hausnummer</span>
										<input
											bind:value={selectedClub.housenumber}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
								</div>
							</div>
						{:else if tabSet === 2}
							{#if clubDetails.Gyms.length > 0}
								<dl class="list-dl">
									{#each clubDetails.Gyms as gym}
										<div>
											<span class="flex-auto">
												<dt>{gym.name}</dt>
												<dd>{gym.plz} {gym.location}, {gym.street} {gym.housenumber}</dd>
											</span>
										</div>
									{/each}

									<!-- ... -->
								</dl>
							{:else}
								<p>Keine Hallen vorhanden</p>
							{/if}
						{:else if tabSet === 3}
							<p>Tab 2</p>
						{:else if tabSet === 4}
							{#if clubDetails.Teams.length > 0}
								<div class="overflow-scroll h-[47vh]">
									<dl class="list-dl">
										{#each clubDetails.Teams as team}
											<div>
												<span class="flex-auto">
													<dt>{team.gender + team.agegroup + team.number}</dt>
												</span>
											</div>
										{/each}
									</dl>
								</div>
							{:else}
								<p>Keine Teams vorhanden</p>
							{/if}
						{:else if tabSet === 5}
							<p>Tab 4</p>
						{:else if tabSet === 6}
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
		</div>
	</div>
</main>

<style>
</style>
