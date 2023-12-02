<script lang="ts">
	import type { PageData, ActionData } from './$types';
	export let data: PageData;

	const optionsClubnames = data.allClubNames;
</script>

<main class="flex items-center ml-[35vw] justify-start float-none w-[30vw] h-[90vh]">
	<div class="card p-2">
		<form method="POST" action="?/createUser">
			<h1 class="h3">Add Account</h1>
			<label>
				<span>Firstname</span>
				<input name="firstname" class="input" type="text" placeholder="Max" />
			</label>
			<label>
				<span>Lastname</span>
				<input name="lastname" class="input" type="text" placeholder="Mustermann" />
			</label>
			<label>
				<span>Telephone</span>
				<input name="tel" class="input" type="tel" placeholder="+49 123 456 789" />
			</label>
			<label>
				<span>Email</span>
				<input name="email" class="input" type="email" placeholder="max.mustermann@test.com" />
			</label>
			<label>
				<span>Password</span>
				<input name="password" class="input" type="text" placeholder="asdfg" />
			</label>
			<label>
				<span>Club</span>
				<select name="Club" id="Club" class="select">
					<option value={null}>-- Optionen --</option>
					{#each optionsClubnames as club}
						<option value={club.id}>{club.name}</option>
					{/each}
				</select>
			</label>
			<button class="btn variant-filled-primary float-right mt-3" type="submit">Send</button>
		</form>
	</div>
</main>

<style>
</style>
