<script lang="ts">
	import type { Avatar } from '$lib/avatars/Avatar.types';

	export let avatar: Avatar;
	export let onClick: (avatar: Avatar) => void;
</script>

<div
	class="result-card"
	role="button"
	tabindex="0"
	on:click={() => onClick(avatar)}
	on:keydown={(e) => e.key === 'Enter' && onClick(avatar)}
>
	<h3>{avatar.name ?? 'Unnamed Avatar'}</h3>
	<p>{avatar.description ?? 'No description available.'}</p>
	{#if avatar.gender}
		<span class="tag">{avatar.gender}</span>
	{/if}
	{#if avatar.categories && avatar.categories.length > 0}
		<div class="categories">
			{#each avatar.categories as category}
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


	h3 {
		margin: 0 0 0.5rem 0;
		font-size: 1.2rem;
		color: var(--color-text);
	}

	p {
		margin: 0 0 1rem 0;
		color: var(--color-text-secondary);
		font-size: 0.9rem;
		line-height: 1.4;
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
		background: var(--color-primary-light);
		color: var(--color-primary);
		border-radius: 12px;
		font-size: 0.75rem;
		font-weight: 500;
	}
</style>