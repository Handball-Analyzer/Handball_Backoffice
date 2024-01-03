<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import { Toast, type TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { User, UserDetails } from '$lib/types/User';
	import { get } from 'svelte/store';
	import { token } from '$lib/Store';
	import { onMount } from 'svelte';
	import { changeActiveUser, loadData, userDetails } from './request';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { createToast } from '$lib/Toast';

	initializeStores();
	const toastStore = getToastStore();
	let allUserData: User[] = [];
	let userDetail: UserDetails = { Teams: [], Clubs: [] };

	let filtervalue: string = '';

	onMount(async () => {
		allUserData = await loadData(get(token));
		console.log(allUserData);
		tableSimple.body = tableMapperValues(allUserData, ['id', 'firstname', 'lastname', 'active']);
		tableSimple.meta = tableMapperValues(allUserData, [
			'id',
			'firstname',
			'lastname',
			'email',
			'gender',
			'role',
			'active'
		]);
		tableSimple.foot = ['Total', '', '<code class="code">' + allUserData.length + '</code>'];
	});

	let selecet_User: User;

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['UUID', 'Firstname', 'Lastname', 'Aktive '],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(allUserData, ['id', 'firstname', 'lastname', 'active'])
	};

	async function selected(event: { detail: any }) {
		userDetail = await userDetails(get(token), event.detail[0]);
		let selectedRow = event.detail;
		selecet_User = {
			id: selectedRow[0],
			firstname: selectedRow[1],
			lastname: selectedRow[2],
			email: selectedRow[3],
			gender: selectedRow[4],
			role: selectedRow[5],
			active: selectedRow[6]
		};
	}
	async function changeActive() {
		console.log(selecet_User);
		const status = await changeActiveUser(selecet_User.id, get(token));
		await window.location.reload();
		if (status == 200) {
			toastStore.trigger(createToast('User status wurde erfolgreich geändert', 'success'));
		} else {
			toastStore.trigger(createToast('Error', 'error'));
		}
	}

	function tablefilter() {
		let filter = filtervalue.toLowerCase();
		const filterData = allUserData.filter((row) => {
			return (
				row.firstname.toLowerCase().includes(filter) ||
				row.lastname.toLowerCase().includes(filter) ||
				(row.firstname + ' ' + row.lastname).toLowerCase().includes(filter)
			);
		});
		tableSimple.body = tableMapperValues(filterData, ['id', 'firstname', 'lastname', 'active']);
		tableSimple.foot = ['Total', '', '<code class="code">' + filterData.length + '</code>'];
	}

	let tabSet: number = 0;
</script>

<Toast />
<main class="m-3">
	<div class="flex flex-row w-screen justify-between">
		<h1 class="h2">Accounts</h1>
		<a href="/addaccount"><button class="btn variant-filled-primary mr-[5vw]">Add New</button></a>
	</div>
	{#if allUserData.length >= 1}
		<div class="flex flex-row items-top h-[60vh]">
			<div class="w-1/2 h-full m-2">
				<div class="flex flex-row justify-between mb-1">
					<h3 class="h3">List of all User Accounts</h3>
					<input
						bind:value={filtervalue}
						on:change={tablefilter}
						class="input w-1/2 h-1/6"
						type="search"
						placeholder="Search..."
					/>
				</div>

				<Table interactive={true} on:selected={selected} source={tableSimple} />
			</div>
			{#if selecet_User != undefined}
				<div class="w-1/2 h-full m-2">
					<div class="h-full">
						<div class="flex flex-row">
							<h1 class="h3 mr-2">{selecet_User.lastname}, {selecet_User.firstname}</h1>
							{#if selecet_User.active}
								<span class="chip variant-ghost-success">Active</span>
							{:else if !selecet_User.active}
								<span class="chip variant-ghost-error">Disabled</span>
							{/if}
						</div>
						<TabGroup class="w-[40vw]">
							<Tab bind:group={tabSet} name="tab1" value={0}>Personal</Tab>
							<Tab bind:group={tabSet} name="tab2" value={1}>Clubs</Tab>
							<Tab bind:group={tabSet} name="tab2" value={2}>Teams</Tab>
							<Tab bind:group={tabSet} name="tab3" value={3}>Password</Tab>
							<Tab bind:group={tabSet} name="tab3" value={4}>Disable</Tab>
							<!-- Tab Panels --->
							<svelte:fragment slot="panel">
								{#if tabSet === 0}
									<div class="grid grid-cols-2 grid-rows-3 gap-4">
										<label class="label col-start-1 row-start-1">
											<span>UUID:</span>
											<input
												bind:value={selecet_User.id}
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
												bind:value={selecet_User.email}
												class="input"
												type="text"
												placeholder="Input"
											/>
										</label>
										<label class="label col-start-2 row-start-3">
											<span>Role:</span>
											<input
												bind:value={selecet_User.role}
												class="input"
												type="text"
												placeholder="Input"
											/>
										</label>
									</div>
								{:else if tabSet === 1}
									{#if userDetail.Clubs.length > 0}
										<div class="overflow-scroll h-[47vh]">
											<dl class="list-dl">
												{#each userDetail.Clubs as club}
													<div>
														<span class="flex-auto">
															<dt>{club.name}</dt>
														</span>
													</div>
												{/each}
											</dl>
										</div>
									{:else}
										<p>Keine Teams vorhanden</p>
									{/if}
								{:else if tabSet === 2}
									{#if userDetail.Teams.length > 0}
										<div class="overflow-scroll h-[47vh]">
											<dl class="list-dl">
												{#each userDetail.Teams as team}
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
								{:else if tabSet === 3}
									<div class="flex flex-col">
										<div class="flex flex-row">
											<label class="label">
												<span>Set neu Password:</span>
												<input class="input" type="text" placeholder="Input" />
											</label>
										</div>
									</div>
								{:else if tabSet === 4}
									<div class="flex flex-col">
										<div class="flex flex-row">
											<label class="label">
												{#if selecet_User.active == true}
													<span>Disable Account:</span>
													<button on:click={changeActive} class="btn variant-filled"
														>Disable account</button
													>
												{:else}
													<span>Enable Account:</span>
													<button on:click={changeActive} class="btn variant-filled"
														>Enable Account</button
													>
												{/if}
											</label>
										</div>
									</div>
								{/if}
							</svelte:fragment>
						</TabGroup>
					</div>
					{#if selecet_User.id != null}
						<button
							class="float-right btn variant-filled"
							on:click={() => alert('Wurde Erfolgreich gespeichert!')}>Save</button
						>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
</main>

<style>
</style>
