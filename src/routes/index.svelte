<script>
	import ActivityTracker from '$lib/ActivityTracker.svelte';
	import { DESIGNS_PER_FEATURE, LINES_OF_CODE_PER_DESIGN } from '$lib/constants';
	import Counter from '$lib/Counter.svelte';
	import Employee from '$lib/Employee.svelte';
	import ScrumBoard from '$lib/ScrumBoard.svelte';
	let features = 0;
	let designs = 0;
	let linesOfCode = 0;
	let money = 0;
	let pm = 0;
	let ux = 0;
	let eng = 0;
	let tickMultiplier = 1;
	let revenueMultiplier = 10;
	let maxEmployees = 5;
	let customers = 0;
	let maxLinesOfCode = 0;
	let forceDisableAddFeature = false;
	let forceDisableAddDesign = false;
	let showHeadOfSales = false;
	let headOfSalesHired = false;

	function tick() {
		money += linesOfCode * revenueMultiplier;
		linesOfCode = Math.min(maxLinesOfCode, linesOfCode + eng);
		setTimeout(tick, tickspeed);
	}
	tick();

	function addFeature() {
		features++;
		forceDisableAddFeature = true;
		setTimeout(() => (forceDisableAddFeature = false), tickspeed * Math.pow(features, 2));
	}

	function addDesign() {
		designs++;
		forceDisableAddDesign = true;
		setTimeout(() => (forceDisableAddDesign = false), tickspeed * designs);
	}

	$: tickspeed = 1500 * tickMultiplier;
	$: hasMaxDesigns = designs >= DESIGNS_PER_FEATURE * features;
	$: maxLinesOfCode = LINES_OF_CODE_PER_DESIGN * designs;
	$: hasMaxLinesOfCode = linesOfCode >= maxLinesOfCode;
	$: nextEngCost = 10000 * Math.pow(eng, 2) + 10000;
	$: canAffordNextEng = money >= nextEngCost;
	$: numEmployees = eng + ux + pm;
	$: canHire = numEmployees < maxEmployees;
</script>

<main>
	<header>
		<div>
			<h1>Startup Clicker!</h1>
			<h5>Experience the Silicon Valley startup rollercoaster from your couch</h5>
			<div class="money-value">$<span>{money.toLocaleString()}</span></div>
			<div class="customers-value"><span>{customers}</span> customers</div>
		</div>

		<ActivityTracker
			{linesOfCode}
			{money}
			bind:customers
			bind:revenueMultiplier
			bind:showHeadOfSales
		/>
	</header>

	<section>
		<div class="section-header">Bizness.io</div>

		<div class="container">
			<Counter
				addLabel="Feature"
				amountName="Features"
				counter={features}
				onAdd={addFeature}
				disabled={forceDisableAddFeature}
			/>
			<Counter
				addLabel="Designs"
				amountName="Design"
				counter={designs}
				disabled={forceDisableAddDesign || hasMaxDesigns}
				onAdd={addDesign}
			/>
			<Counter
				addLabel="Code"
				amountName="Lines of Code"
				counter={linesOfCode}
				disabled={hasMaxLinesOfCode}
				onAdd={() => linesOfCode++}
			/>
		</div>
	</section>

	<section>
		<div class="section-header">Employees</div>
		<ul class="job-postings">
			<Employee
				cost={nextEngCost}
				jobTitle="Engineer"
				disabled={!canAffordNextEng || !canHire}
				bind:hired={eng}
				bind:money
			/>
			{#if showHeadOfSales && !headOfSalesHired}
				<Employee
					cost={20000}
					jobTitle="Head of Sales"
					disabled={money < 20000 || !canHire}
					onHire={() => {
						customers += 10;
						headOfSalesHired = true;
					}}
					bind:money
				/>
			{/if}
		</ul>
	</section>

	<section>
		<div class="section-header">Scrum Board</div>
		<ScrumBoard bind:linesOfCode bind:tickMultiplier bind:canHire bind:maxEmployees />
	</section>
</main>

<style lang="scss">
	:global {
		* {
			font-family: 'Inconsolata', sans-serif !important;
		}

		body {
			font-size: 24px;
			color: white;
			padding: 8px;
			background: #7f7fd5; /* fallback for old browsers */
			background: -webkit-linear-gradient(
				to top,
				#91eae4,
				#86a8e7,
				#7f7fd5
			); /* Chrome 10-25, Safari 5.1-6 */
			background: linear-gradient(
				to top,
				#91eae4,
				#86a8e7,
				#7f7fd5
			); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		}

		button {
			border: solid 1px white;
			border-radius: 8px;
			outline: none;
			padding: 8px;
			min-width: 150px;
			color: white;
			display: block;
			margin: auto;
			font-size: 24px;
			cursor: pointer;
			transition: 0.5s;
			background-size: 200% auto;
			background-image: linear-gradient(to right, #606c88 0%, #3f4c6b 51%, #606c88 100%);

			&:hover:not(:disabled) {
				background-position: right center; /* change the direction of the change here */
				color: #fff;
				text-decoration: none;
			}

			&:disabled {
				cursor: not-allowed;
				opacity: 0.5;

				.can-add {
					color: transparent;
				}
			}
		}
	}

	section {
		margin-bottom: 16px;
	}

	header {
		display: flex;

		h1 {
			margin: 0 0 8px;
		}

		h5 {
			margin: 0;
		}
	}

	.hidden {
		display: none;
		visibility: hidden;
	}

	.section-header {
		text-decoration: underline;
		font-size: 30px;
		margin-bottom: 16px;
	}

	.container {
		display: flex;
	}

	.job-postings {
		display: flex;
		flex-wrap: wrap;
		list-style: none;
		margin: 0;
		padding: 0;
	}
</style>
