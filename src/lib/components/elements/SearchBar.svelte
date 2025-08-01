<script lang="ts">
	export let onSearch: (query: string) => void;
	export let placeholder: string = "Search...";

	let searchTimeout: ReturnType<typeof setTimeout>;
	let searchInput: HTMLInputElement;

	function handleSearchInput(event: Event) {
		const query = (event.target as HTMLInputElement).value;
		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			onSearch(query);
		}, 300);
	}
</script>

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
	<input type="text" {placeholder} oninput={handleSearchInput} bind:this={searchInput} />
</div>

<style>
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
</style>