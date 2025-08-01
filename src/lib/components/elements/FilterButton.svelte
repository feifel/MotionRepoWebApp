<script lang="ts">
	export let onClick: () => void;
	export let ariaLabel: string = "Filter";
</script>

<button class="filter-button" aria-label={ariaLabel} onclick={onClick}>
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

<style>
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
		margin-right: 10px;
	}

	.filter-button:hover {
		background-color: var(--color-primary-tint1);
		transform: scale(1.05);
	}

	.filter-button svg {
		stroke: var(--color-neutral-tint1);
	}
</style>