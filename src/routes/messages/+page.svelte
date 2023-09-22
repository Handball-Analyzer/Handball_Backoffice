<script lang="ts">
    import { Table } from '@skeletonlabs/skeleton';
    import type { TableSource } from '@skeletonlabs/skeleton';
    import { tableMapperValues } from '@skeletonlabs/skeleton';
	const mock_data = [
		{ firstname: 'Tom', lastname: 'Becker', club: 'VFL Waiblingen' },
		{ firstname: 'Walter', lastname: 'White', club: 'VFL Waiblingen' },
		{ firstname: 'Tim', lastname: 'Tinki', club: 'VFL Waiblingen' },
		{ firstname: 'Werner', lastname: 'Warnt', club: 'VFL Waiblingen' },
		{ firstname: 'Tam', lastname: 'Tam', club: 'VFL Waiblingen' },
		{ firstname: 'Wolfgang', lastname: 'Wolf', club: 'VFL Waiblingen' }
	];

const tableSimple: TableSource = {
	// A list of heading labels.
	head: ['fistname', 'lastname', 'Club'],
	// The data visibly shown in your table body UI.
	body: tableMapperValues(mock_data, ['firstname', 'lastname', 'club']),
	// Optional: The data returned when interactive is enabled and a row is clicked.
	meta: tableMapperValues(mock_data, ['firstname', 'lastname', 'club',]),
	// Optional: A list of footer labels.
	foot: ['Total', '', '<code class="code">'+ mock_data.length +'</code>']
};
				
</script>

<main class="flex flex-row">
	<div class="h-[70vh] w-[30vw] m-5">
		<div class="mb-2 flex flex-row justify-around">
			<input class="input w-2/3" placeholder="Search" type="text" />
            <button class="btn variant-filled-primary">New Chat</button>
		</div>
		<Table source={tableSimple} />
	</div>
</main>

<style>
</style>
