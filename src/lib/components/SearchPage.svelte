<script lang="ts">
	export let title: string;
	export let description: string;
	export let onSearch: (query: string) => void = () => {};

	let searchTimeout: ReturnType<typeof setTimeout>;

	function handleSearchInput(event: Event) {
		const query = (event.target as HTMLInputElement).value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			onSearch(query);
		}, 300);
	}
</script>

<div class="container">
	<div class="top-bar">
		<div class="search-bar">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-search"
			>
				<circle cx="7" cy="7" r="6"></circle>
				<path d="m14 14-3-3"></path>
			</svg>
			<input type="text" placeholder="Search..." on:input={handleSearchInput} />
		</div>
		<button class="filter-button" aria-label="Filter">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="16"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="lucide lucide-filter"
			>
				<polygon points="14 2 2 2 7 9 7 13 9 14 9 9 14 2"></polygon>
			</svg>
		</button>
	</div>

	<h1>{title}</h1>
	<p>{description}</p>

	<slot />
</div>

<style>
	.container {
		padding: 2rem;
		max-width: 1200px;
		margin: 0 auto;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.search-bar {
		position: relative;
		flex-grow: 1;
		margin-right: 10px;
		display: flex;
	}

	.search-bar input {
		background: var(--color-bg-neutral);
		padding: 10px 10px 10px 40px;
		border: 1px solid var(--color-primary);
		border-radius: 5px;
		outline: none;
		width: 100%;
		flex-grow: 1;
		color: var(--color-neutral-tint1);
	}

	.search-bar svg {
		position: absolute;
		left: 12px;
		top: 50%;
		transform: translateY(-50%);
		stroke: var(--color-primary-shade1);
	}

	.filter-button {
		background-color: var(--color-primary);
		color: white;
		border: none;
		padding: 9px 14px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1rem;
		width: fit-content;
		flex-shrink: 0;
	}

	.filter-button:hover {
		background-color: var(--color-primary-tint1);
		transform: scale(1.05);
	}

	.filter-button svg {
		stroke: var(--color-neutral-tint1);
	}

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

</style>