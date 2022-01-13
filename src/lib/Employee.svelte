<script>
	export let jobTitle;
	export let cost;
	export let disabled;
	export let hired = -1;
	export let money;
	export let onHire = () => {
		hired++;
	};

	function onClick() {
		onHire();
		money -= cost;
	}
</script>

<li>
	<button on:click={onClick} {disabled}>
		<span class="can-add">+</span>
		{jobTitle} (${cost.toLocaleString()})
	</button>
	{#if hired >= 0}
		<div class="amount">
			{jobTitle}s: {hired}
		</div>
	{/if}
</li>

<style>
	li {
		margin: 0 16px 16px 0;
	}

	.amount {
		margin-bottom: 8px;
	}
</style>
