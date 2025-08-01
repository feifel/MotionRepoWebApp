<script lang="ts">
	import type { Workout } from './Workout.types';
	import Tag from '$lib/components/elements/Tag.svelte';

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
			<Tag tag={workout.difficulty} readonly={true} />
		{/if}
		{#if workout.duration}
			<Tag tag={`${workout.duration} min`} readonly={true} />
		{/if}
	</div>
	{#if workout.categories && workout.categories.length > 0}
		<div class="categories">
			{#each workout.categories as category}
				<Tag tag={category} readonly={true} />
			{/each}
		</div>
	{/if}
</div>
