<script>
	export let trigger;
	export let text;
	export let afterTrigger = () => {};

	let triggered = false;

	$: {
		if (!triggered && trigger) {
			afterTrigger();
			triggered = true;
		}
	}
</script>

{#if triggered || trigger}
	<li>{text}</li>
{/if}
