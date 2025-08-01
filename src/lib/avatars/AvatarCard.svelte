<script lang="ts">
	import type { Avatar } from '$lib/avatars/Avatar.types';
	import Tag from '$lib/components/elements/Tag.svelte';

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
	<div class="tags">
		{#if avatar.gender}
			<Tag tag='Gender: {avatar.gender}' readonly={true} />
		{/if}
		{#if avatar.categories && avatar.categories.length > 0}
			{#each avatar.categories as category}
				<Tag tag='Category: {category}' readonly={true} />
			{/each}
		{/if}
	</div>	
</div>

<style>
	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0.7rem 0rem 0.7rem 0rem;
	}
</style>