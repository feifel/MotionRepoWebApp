<script lang="ts">
	export let onClick: () => void;
	export let ariaLabel: string = "Filter";
</script>

<button class="filter-button" aria-label={ariaLabel} onclick={onClick}>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="lucide lucide-filter"
	>
		<polygon points="17.5 2.5 2.5 2.5 8.75 11.25 8.75 16.25 11.25 17.5 11.25 11.25 17.5 2.5"></polygon>
	</svg>
</button>

<style>
	.filter-button {
		background-color: var(--color-primary);
		border: none;
		padding: 8px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1rem;
		width: 42px;
		height: 42px;
		flex-shrink: 0;
		margin-right: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.filter-button:hover {
		background-color: var(--color-primary-tint1);
		transform: scale(1.05);
	}

	.filter-button svg {
		stroke: var(--color-neutral-tint1);
	}
</style>