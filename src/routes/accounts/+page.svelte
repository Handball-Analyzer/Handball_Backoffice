<script lang="ts">
	import { Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { PageData, ActionData } from './$types';
	import type { User } from '$lib/types/User';
	import { requestDisableAccount, requestEnableAccount } from './requests';
	export let data: PageData;

	let allUserData = data.allUserData;

	let selecet_User: User;

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['UUID', 'Firstname', 'Lastname', 'Status'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(allUserData, ['id', 'firstname', 'lastname', 'active']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(allUserData, [
			'id',
			'firstname',
			'lastname',
			'email',
			'gender',
			'password',
			'role',
			'active'
		]),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">' + allUserData.length + '</code>']
	};

	function test(event: { detail: any }) {
		let seleceted_row = event.detail;
		selecet_User = {
			id: seleceted_row[0],
			firstname: seleceted_row[1],
			lastname: seleceted_row[2],
			email: seleceted_row[3],
			gender: seleceted_row[4],
			password: seleceted_row[5],
			role: seleceted_row[6],
			active: seleceted_row[7]
		};
	}
	async function enableAccount() {
		await requestEnableAccount(selecet_User.id);
		await window.location.reload();
	}
	async function disableAccount() {
		await requestDisableAccount(selecet_User.id);
		await window.location.reload();
	}
	let tabSet: number = 0;
</script>

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
					<input class="input w-1/2 h-1/6" type="search" placeholder="Search..." />
				</div>

				<Table interactive={true} on:selected={test} source={tableSimple} />
			</div>
			{#if selecet_User != undefined}
				<div class="w-1/2 h-full m-2">
					<div class="h-full">
						<div class="flex flex-row">
							<h1 class="h3 mr-2">{selecet_User.lastname}, {selecet_User.firstname}</h1>
							{#if selecet_User.active == true}
								<span class="chip variant-ghost-success">Active</span>
							{:else if !selecet_User.active}
								<span class="chip variant-ghost-error">Disabled</span>
							{/if}
						</div>
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
									<div class="flex flex-col">
										<div class="flex flex-row">
											<label class="label">
												<span>Club:</span>
												<input
													bind:value={selecet_User.email}
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
												{#if selecet_User.active == true}
													<span>Disable Account:</span>
													<button on:click={disableAccount} class="btn variant-filled"
														>Disable account</button
													>
												{:else}
													<span>Enable Account:</span>
													<button on:click={enableAccount} class="btn variant-filled"
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
