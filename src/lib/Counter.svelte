<script>
	export let amountName;
	export let addLabel;
	export let counter;
	export let onAdd;
	export let disabled = false;
</script>

<div class="counter">
	<div class="amount">
		{amountName}: {counter}
	</div>
	<button on:click={onAdd} {disabled}>
		<span class="can-add">+</span>
		{addLabel}
	</button>
</div>

<style>
	.counter {
		margin-right: 16px;
	}

	.amount {
		margin-bottom: 8px;
	}
</style>
