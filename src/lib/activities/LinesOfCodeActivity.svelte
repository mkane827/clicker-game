<script>
	import OneTimeActivity from './OneTimeActivity.svelte';

	export let linesOfCode;
	export let triggerAt;
	export let text;
	export let afterTrigger = () => {};
</script>

<OneTimeActivity trigger={linesOfCode >= triggerAt} {text} {afterTrigger} />
