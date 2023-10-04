<script lang="ts">
	import { Avatar, Table } from '@skeletonlabs/skeleton';
	import type { TableSource } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	import mock_user from '../../lib/data/MessagUser.json'
	const mock_data = mock_user
	let currentMessage = '';
	type User = {
		firstname: string;
		lastname: string;
		club: string;
	};
	let selecet_User: User = {
		firstname: '',
		lastname: '',
		club: ''

	};


	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['fistname', 'lastname', 'Club'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(mock_data, ['firstname', 'lastname', 'club']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(mock_data, ['firstname', 'lastname', 'club']),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">' + mock_data.length + '</code>']
	};
	function test(event: { detail: any }) {
		let seleceted_row = event.detail;
		selecet_User.firstname = seleceted_row[0]
		selecet_User.lastname = seleceted_row[1]
		selecet_User.club = seleceted_row[2]

	
	}
</script>

<main class="flex flex-row">
	<div class="h-[70vh] w-[30vw] m-5">
		<div class="mb-2 flex flex-row justify-around">
			<input class="input w-2/3" placeholder="Search" type="text" />
			<button class="btn variant-filled-primary">New Chat</button>
		</div>
		<Table interactive={true} on:selected={test} source={tableSimple} />
	</div>
	{#if selecet_User.firstname != ''}
	<div class="h-[70vh] w-[60vw] card m-5 relative">
		<div class="card-header mb-3">
			<h3 class="card-title">Chat with: {selecet_User.firstname} {selecet_User.lastname} (Trainer, {selecet_User.club})</h3>
		</div>

		<div class="grid grid-cols-[auto_1fr] gap-2 p-3">
			<Avatar src="" width="w-12" />
			<div class="card p-4 variant-soft rounded-tl-none space-y-2">
				<header class="flex justify-between items-center">
					<p class="font-bold">Hello Welcome</p>
					<small class="opacity-50">yesterday @ 22:34</small>
				</header>
				<p>This is a test Message</p>
			</div>
		</div>

		<div
			class="input-group input-group-divider grid-cols-[auto_1fr_auto] rounded-container-token bottom-0 absolute"
		>
			<button class="input-group-shim">+</button>
			<textarea
				bind:value={currentMessage}
				class="bg-transparent border-0 ring-0"
				name="prompt"
				id="prompt"
				placeholder="Write a message..."
				rows="1"
			/>
			<button class="variant-filled-primary">Send</button>
		</div>
	</div>
		
	{/if}
	
</main>

<style>
</style>
