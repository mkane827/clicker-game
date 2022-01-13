<script>
	export let name;
	export let cost;
	export let description;
	export let onComplete;
</script>

<button on:click={onComplete}>
	<div class="name">{name}</div>
	<span class="cost">{cost}</span>
	<span class="description">{description}</span>
</button>

<style lang="scss">
	button {
		background: grey;
		border-radius: 8px;
		border: none;
		width: 100%;
		color: black;
		text-align: left;

		&:hover {
			color: black;
		}

		&:disabled {
			background: lightgrey;
			color: grey;
		}
	}

	.name {
		margin-bottom: 8px;
		font-weight: bold;
	}

	.cost {
		padding-right: 16px;
		margin-right: 16px;
		border-right: solid 1px black;
	}
</style>
