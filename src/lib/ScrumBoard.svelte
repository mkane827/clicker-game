<script>
	import ScrumTask from './ScrumTask.svelte';
	export let linesOfCode;
	export let tickMultiplier;
	export let canHire;
	export let maxEmployees;

	let hiredCofounders = false;
	let leasedFirstOffice = false;
</script>

<ul>
	{#if linesOfCode > 70 && !hiredCofounders}
		<li>
			<ScrumTask
				cost="66%"
				name="GET TWO COFOUNDERS"
				description="Get work done faster and split equity equally between all three cofounders."
				onComplete={() => {
					hiredCofounders = true;
					tickMultiplier = Math.min(1, Math.max(0, tickMultiplier - 0.3));
				}}
			/>
		</li>
	{/if}
	{#if !canHire && !leasedFirstOffice}
		<li>
			<ScrumTask
				cost="$25,000"
				name="LEASE OFFICE SPACE"
				description="Find your first office space."
				onComplete={() => {
					leasedFirstOffice = true;
					maxEmployees += 10;
				}}
			/>
		</li>
	{/if}
</ul>

<style>
	ul {
		list-style: none;
	}

	li {
		margin-bottom: 16px;
	}
</style>
