<script lang="ts">
</script>

<main class="flex items-center ml-[35vw] justify-start float-none w-[30vw] h-[90vh]">
	<div class="card p-2">
		<form>
			<h1 class="h3">Add Account</h1>
			<label>
				<span>Firstname</span>
				<input class="input" type="text" placeholder="Max Mustermann" />
			</label>
			<label>
				<span>Lastname</span>
				<input class="input" type="text" placeholder="Max Mustermann" />
			</label>
			<label>
				<span>Telephone</span>
				<input class="input" type="tel" placeholder="+61 123 456 789" />
			</label>
			<label>
				<span>Email</span>
				<input class="input" type="email" placeholder="max.mustermann@test.com" />
			</label>
			<label>
				<span>Club</span>
				<select name="Club" id="Club" class="select">
					<option value="--">-- Optionen --</option>
					<option value="TSV Schmiden">TSV Schmiden</option>
					<option value="TSV Schmiden">VFL Waiblingen</option>
					<option value="TSV Schmiden">HSC Schmoeff</option>
					<option value="TSV Schmiden">TV Oeffingen</option>
					<option value="TSV Schmiden">HC Schmoeff</option>
				</select>
			</label>
			<button class="btn variant-filled-primary float-right mt-3" type="submit">Send</button>
		</form>
	</div>
</main>

<style>
</style>
