<script lang="ts">
	import Clubs from '../../lib/data/Club.json'
	

</script>

<main class="flex items-center ml-[35vw] justify-start float-none w-[30vw] h-[90vh]">
	<div class="card p-2">
		<form>
			<h1 class="h3">Add Account</h1>
			<label>
				<span>Firstname</span>
				<input class="input" type="text" placeholder="Max" />
			</label>
			<label>
				<span>Lastname</span>
				<input class="input" type="text" placeholder="Mustermann" />
			</label>
			<label>
				<span>Telephone</span>
				<input class="input" type="tel" placeholder="+49 123 456 789" />
			</label>
			<label>
				<span>Email</span>
				<input class="input" type="email" placeholder="max.mustermann@test.com" />
			</label>
			<label>
				<span>Club</span>
				<select name="Club" id="Club" class="select">
					<option value="--">-- Optionen --</option>
					{#each Clubs as club}
						<option value={club.UUID}>{club.Name}</option>
					{/each}
					
					
				</select>
			</label>
			<button class="btn variant-filled-primary float-right mt-3" type="submit">Send</button>
		</form>
	</div>
</main>

<style>
</style>
