<script lang="ts">
	export let onClick: () => void;
	export let ariaLabel: string = 'Filter';
</script>

<button class="button" aria-label={ariaLabel} onclick={onClick}>
	<svg
		fill="none"
		stroke="currentColor"
		height="25"
		width="25"
		version="1.1"
		id="Capa_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		viewBox="0 0 612.002 612.002"
		xml:space="preserve"
		><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
			id="SVGRepo_tracerCarrier"
			stroke-linecap="round"
			stroke-linejoin="round"
		></g><g id="SVGRepo_iconCarrier">
			<g>
				<g>
					<path
						fill="currentColor"
						d="M522.878,241.337c-16.836-56.94-69.528-98.491-131.924-98.491c-9.94,0-19.632,1.065-28.974,3.067 c-25.173-32.322-64.453-53.114-108.593-53.114c-75.976,0-137.564,61.59-137.564,137.565c0,0.946,0.016,1.889,0.036,2.83 C49.78,246.45,0,304.8,0,374.782c0,79.762,64.658,144.421,144.419,144.421h323.161c79.763,0,144.421-64.659,144.421-144.421 C612,314.612,575.197,263.041,522.878,241.337z M371.914,381.056l-50.05,50.044c-4.382,4.382-10.125,6.572-15.867,6.572 c-5.744,0-11.486-2.191-15.869-6.574l-50.042-50.045c-8.766-8.765-8.763-22.974,0-31.739c8.765-8.763,22.971-8.763,31.739,0.002 l11.728,11.73V255.953c0-12.395,10.049-22.442,22.444-22.442c12.395,0,22.444,10.047,22.444,22.442v105.099l11.739-11.737 c8.762-8.765,22.973-8.762,31.739,0.002C380.681,358.084,380.679,372.293,371.914,381.056z"
					></path>
				</g>
			</g>
		</g></svg
	>
</button>

<style>
	.button {
		background-color: var(--color-primary);
		color: white;
		border: none;
		padding: 8px;
		border-radius: 5px;
		cursor: pointer;
		font-size: 1rem;
		width: fit-content;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.button:hover {
		background-color: var(--color-primary-tint1);
		transform: scale(1.05);
	}

	.button svg {
		stroke: var(--color-neutral-tint1);
	}
</style>
