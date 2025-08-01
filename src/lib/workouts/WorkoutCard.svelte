<script lang="ts">
	import type { Workout } from './Workout.types';

	export let workout: Workout;
	export let onClick: (workout: Workout) => void;
</script>

<div
	class="result-card"
	on:click={() => onClick(workout)}
	on:keydown={(e) => e.key === 'Enter' && onClick(workout)}
	tabindex="0"
	role="button"
>
	<h3>{workout.name || 'Unnamed Workout'}</h3>
	<p>{workout.description || 'No description available.'}</p>
	<div class="workout-meta">
		{#if workout.difficulty}
			<span class="tag difficulty-{workout.difficulty.toLowerCase()}">{workout.difficulty}</span>
		{/if}
		{#if workout.duration}
			<span class="tag">{workout.duration} min</span>
		{/if}
	</div>
	{#if workout.categories && workout.categories.length > 0}
		<div class="categories">
			{#each workout.categories as category}
				<span class="tag">{category}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.result-card {
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.result-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.result-card:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
	}

	.workout-meta {
		display: flex;
		gap: 0.5rem;
		margin: 0.5rem 0;
	}

	.difficulty-beginner {
		background-color: #4caf50;
		color: white;
	}

	.difficulty-intermediate {
		background-color: #ff9800;
		color: white;
	}

	.difficulty-advanced {
		background-color: #f44336;
		color: white;
	}

	.categories {
		display: flex;
		flex-wrap: wrap;
		gap: 0.25rem;
		margin-top: 0.5rem;
	}

	.tag {
		display: inline-block;
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
		background-color: var(--color-primary-light);
		color: var(--color-primary);
	}

	h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--color-text);
	}

	p {
		margin: 0 0 0.5rem 0;
		color: var(--color-text-secondary);
		font-size: 0.875rem;
		line-height: 1.4;
	}
</style>