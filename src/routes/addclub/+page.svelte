<script lang="ts">
</script>

<main class="flex items-center ml-[35vw] justify-start float-none w-[30vw] h-[90vh]">
	<div class="card p-2">
		<form method="POST" action="?/createClub">
			<h1 class="h3">Add Club</h1>
			<label>
				<span>Name</span>
				<input name="name" class="input" type="text" placeholder="TSV Musterhausen" />
			</label>
			<label>
				<span>PLZ</span>
				<input name="plz" class="input" type="number" placeholder="70730" />
			</label>
			<label>
				<span>Place</span>
				<input name="location" class="input" type="text" placeholder="Musterhausen" />
			</label>
			<label>
				<span>Street</span>
				<input name="street" class="input" type="text" placeholder="Musterstraße" />
			</label>
			<label>
				<span>Housenumber</span>
				<input name="housenumber" class="input" type="number" placeholder="13" />
			</label>
			<button class="btn variant-filled-primary float-right mt-3" type="submit">Send</button>
		</form>
	</div>
</main>

<style>
</style>
