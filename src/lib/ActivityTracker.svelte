<script>
	import { afterUpdate } from 'svelte';

	import LinesOfCodeActivity from './activities/LinesOfCodeActivity.svelte';
	import OneTimeActivity from './activities/OneTimeActivity.svelte';
	export let linesOfCode;
	export let customers;
	export let revenueMultiplier;
	export let money;
	export let showHeadOfSales;

	let list, scrollHeight;

	afterUpdate(() => ({ scrollHeight } = list));

	$: {
		if (list) {
			list.scrollTop = scrollHeight;
		}
	}
</script>

<ul bind:this={list}>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={10}
		text="No one knows about your startup idea, just you"
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={15}
		text="A few close friends say they like your idea you can't tell if they mean it or if they are just being nice"
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={30}
		text="Your parents do not understand your idea"
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={40}
		text="Coding all night pays off, your MVP is ready to share!"
	/>
	<LinesOfCodeActivity {linesOfCode} triggerAt={45} text="Give your first demo" />
	<LinesOfCodeActivity {linesOfCode} triggerAt={50} text="Your demo didn't go as planned" />
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={60}
		text="A few people are talking your idea is getting some traction"
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={70}
		text="Your scrum board is overflowing with tasks, time to get some cofounders"
	/>
	<LinesOfCodeActivity {linesOfCode} triggerAt={80} text="Apply to the top incubators" />
	<LinesOfCodeActivity {linesOfCode} triggerAt={105} text="Get rejected from the top incubators" />
	<LinesOfCodeActivity {linesOfCode} triggerAt={110} text="Perfect your demo and pitch" />
	<OneTimeActivity
		trigger={linesOfCode > 125 && money >= 5000}
		text="It's time to make your first hire, pick wisely"
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={130}
		text="Lucky break a spot opened in your second choice incubator "
	/>
	<LinesOfCodeActivity {linesOfCode} triggerAt={145} text="Search for product market fit" />
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={165}
		text="Congratulations you have your first customer"
		afterTrigger={() => customers++}
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={178}
		text="Look for more customers to confirm product market fit"
		afterTrigger={() => (customers += 2)}
	/>
	<LinesOfCodeActivity
		{linesOfCode}
		triggerAt={195}
		text="You're having trouble finding product market fit. You're code now generates 50% less revenue"
		afterTrigger={() => (revenueMultiplier -= 5)}
	/>
	<OneTimeActivity
		trigger={linesOfCode > 260 && money >= 20000}
		text="You need customers go hire
	a head of sales"
		afterTrigger={() => (showHeadOfSales = true)}
	/>
</ul>

<style>
	ul {
		flex: 1 0 50%;
		border: solid 1px white;
		margin-left: 16px;
		border-radius: 8px;
		height: 100%;
		list-style: none;
		padding: 8px;
		overflow: auto;
		height: 220px;
		font-size: 20px;
	}

	ul :global li {
		margin-bottom: 16px;
		border-bottom: solid 1px white;
	}
</style>
