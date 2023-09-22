<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	const sourceData = [
		{ UUID: 123345, firstname: 'Hanes', lastname: 'Müller', Verein: 'VFL Waiblingen' },
		{ UUID: 123346, firstname: 'Manuel', lastname: 'Mayer', Verein: 'VFL Waiblingen' },
		{ UUID: 123347, firstname: 'Sabrina', lastname: 'Ballschmied', Verein: 'VFL Waiblingen' },
		{ UUID: 123348, firstname: 'Thomas', lastname: 'Henkel', Verein: 'VFL Waiblingen' },
		{ UUID: 123349, firstname: 'Theodor', lastname: 'Moor', Verein: 'TV Oeffingen' },
		{ UUID: 123340, firstname: 'Felix', lastname: 'Katnitsch', Verein: 'TSV Schmiden' },
		{ UUID: 123345, firstname: 'Hanes', lastname: 'Müller', Verein: 'VFL Waiblingen' },
		{ UUID: 123346, firstname: 'Manuel', lastname: 'Mayer', Verein: 'VFL Waiblingen' },
		{ UUID: 123347, firstname: 'Sabrina', lastname: 'Ballschmied', Verein: 'VFL Waiblingen' },
		{ UUID: 123348, firstname: 'Thomas', lastname: 'Henkel', Verein: 'VFL Waiblingen' },
		{ UUID: 123349, firstname: 'Theodor', lastname: 'Moor', Verein: 'TV Oeffingen' },
		{ UUID: 123340, firstname: 'Felix', lastname: 'Katnitsch', Verein: 'TSV Schmiden' },
		{ UUID: 123345, firstname: 'Hanes', lastname: 'Müller', Verein: 'VFL Waiblingen' },
		{ UUID: 123346, firstname: 'Manuel', lastname: 'Mayer', Verein: 'VFL Waiblingen' },
		{ UUID: 123347, firstname: 'Sabrina', lastname: 'Ballschmied', Verein: 'VFL Waiblingen' },
		{ UUID: 123348, firstname: 'Thomas', lastname: 'Henkel', Verein: 'VFL Waiblingen' },
		{ UUID: 123349, firstname: 'Theodor', lastname: 'Moor', Verein: 'TV Oeffingen' },
		{ UUID: 123340, firstname: 'Felix', lastname: 'Katnitsch', Verein: 'TSV Schmiden' }
	];
	type User = {
		UUID: string;
		firstname: string;
		lastname: string;
		verein: string;
	};
	let selecet_User: User = {
		UUID: '',
		firstname: '',
		lastname: '',
		verein: ''
	};

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['UUID', 'Firstname', 'Lastname', 'Verein'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['UUID', 'firstname', 'lastname', 'Verein']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['UUID', 'firstname', 'lastname', 'Verein']),
		// Optional: A list of footer labels.
		foot: ['', 'Total', '', '<code class="code">' + sourceData.length + '</code>']
	};

	function test(event: { detail: any }) {
		let seleceted_row = event.detail;
		selecet_User = {
			UUID: seleceted_row[0],
			firstname: seleceted_row[1],
			lastname: seleceted_row[2],
			verein: seleceted_row[3]
		};
	}

	let tabSet: number = 0;
</script>

<main class="m-3">
	<h1 class="h2 ml-2 mb-2">Accounts</h1>
	<div class="flex flex-row items-top h-[60vh]">
		<div class="w-1/2 h-full m-2">
			<div class="flex flex-row justify-between mb-1">
				<h3 class="h3">List of all User Accounts</h3>
				<input class="input w-1/2 h-1/6" type="search" placeholder="Search..." />
				
			</div>
			<Table interactive={true} on:selected={test} source={tableSimple} />
		</div>
		<div class="w-1/2 h-full m-2">
			<div class="h-full">
				<h1 class="h3">User Detail View</h1>
				<TabGroup class="w-[40vw]">
					<Tab bind:group={tabSet} name="tab1" value={0}>Personal</Tab>
					<Tab bind:group={tabSet} name="tab2" value={1}>Club/Teams</Tab>
					<Tab bind:group={tabSet} name="tab3" value={2}>Password</Tab>
					<Tab bind:group={tabSet} name="tab3" value={3}>Disable</Tab>
					<!-- Tab Panels --->
					<svelte:fragment slot="panel">
						{#if tabSet === 0}
							<div class="grid grid-cols-2 grid-rows-3 gap-4">
								
									<label class="label col-start-1 row-start-1">
										<span>UUID:</span>
										<input
											bind:value={selecet_User.UUID}
											class="input"
											type="text"
											placeholder="Input"
											disabled
										/>
									</label>
									<label class="label col-start-1 row-start-2">
										<span>Firstname:</span>
										<input
											bind:value={selecet_User.firstname}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
									<label class="label col-start-2 row-start-2">
										<span>Lastname:</span>
										<input
											bind:value={selecet_User.lastname}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
									<label class="label col-start-1 row-start-3">
										<span>Email:</span>
										<input
											bind:value={selecet_User.firstname}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
									<label class="label col-start-2 row-start-3">
										<span>Role:</span>
										<input
											bind:value={selecet_User.lastname}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
							</div>
						{:else if tabSet === 1}
							<div class="flex flex-col">
								<div class="flex flex-row">
									<label class="label">
										<span>Club:</span>
										<input
											bind:value={selecet_User.verein}
											class="input"
											type="text"
											placeholder="Input"
										/>
									</label>
								</div>
							</div>
						{:else if tabSet === 2}
							<div class="flex flex-col">
								<div class="flex flex-row">
									<label class="label">
										<span>Set neu Password:</span>
										<input class="input" type="text" placeholder="Input" />
									</label>
								</div>
							</div>
						{:else if tabSet === 3}
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
			<button
				class="float-right btn variant-filled"
				on:click={() => alert('Wurde Erfolgreich gespeichert!')}>Save</button
			>
		</div>
	</div>
</main>

<style>
</style>
