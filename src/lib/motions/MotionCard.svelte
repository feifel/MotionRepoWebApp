<script lang="ts">
	import type { Motion } from './Motion.types';

	export let motion: Motion;
	export let onClick: (motion: Motion) => void;
</script>

<div
	class="result-card"
	on:click={() => onClick(motion)}
	role="button"
	tabindex="0"
	on:keydown={(e) => e.key === 'Enter' && onClick(motion)}
>
	<h3>{motion.name || 'Unnamed Motion'}</h3>
	<p>{motion.description || 'No description available.'}</p>
	
	<div class="motion-details">
		{#if motion.fileType}
			<span class="file-type">{motion.fileType}</span>
		{/if}
		{#if motion.level !== undefined}
			<span class="level">Level {motion.level}</span>
		{/if}
		{#if motion.file}
			<span class="file-name">{motion.file}</span>
		{/if}
	</div>

	{#if motion.categories && motion.categories.length > 0}
		<div class="categories">
			{#each motion.categories as category}
				<span class="category">{category}</span>
			{/each}
		</div>
	{/if}

	{#if motion.bodyParts && motion.bodyParts.length > 0}
		<div class="body-parts">
			<strong>Body Parts:</strong>
			{#each motion.bodyParts as part}
				<span class="body-part">{part}</span>
			{/each}
		</div>
	{/if}

	{#if motion.muscleGroups && motion.muscleGroups.length > 0}
		<div class="muscle-groups">
			<strong>Muscle Groups:</strong>
			{#each motion.muscleGroups as muscle}
				<span class="muscle-group">{muscle}</span>
			{/each}
		</div>
	{/if}

	{#if motion.equipment && motion.equipment.length > 0}
		<div class="equipment">
			<strong>Equipment:</strong>
			{#each motion.equipment as equip}
				<span class="equip">{equip}</span>
			{/each}
		</div>
	{/if}

	{#if motion.labels && motion.labels.length > 0}
		<div class="labels">
			{#each motion.labels as label}
				<span class="label">{label}</span>
			{/each}
		</div>
	{/if}
</div>

<style>
	.motion-details {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
		flex-wrap: wrap;
	}

	.motion-details span {
		background: var(--surface-2);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: var(--text-2);
	}

	.categories,
	.body-parts,
	.muscle-groups,
	.equipment,
	.labels {
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
	}

	.body-parts strong,
	.muscle-groups strong,
	.equipment strong {
		margin-right: 0.5rem;
		color: var(--text-1);
	}

	.category,
	.body-part,
	.muscle-group,
	.equip,
	.label {
		display: inline-block;
		background: var(--surface-3);
		color: var(--text-2);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		margin-right: 0.25rem;
		font-size: 0.75rem;
	}


	h3 {
		margin: 0 0 0.5rem 0;
		color: var(--text-1);
		font-size: 1.25rem;
		font-weight: 600;
	}

	p {
		margin: 0 0 1rem 0;
		color: var(--text-2);
		line-height: 1.5;
	}
</style>