<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Tag from './elements/Tag.svelte';
	import SearchBar from './elements/SearchBar.svelte';
	import FilterButton from './elements/FilterButton.svelte';
	import CloudDownload from './elements/CloudDownload.svelte';
	
	export let title: string;
	export let description: string;
	export let onSearch: (query: string) => void;
	export let onFilterClick: () => void;
	export let selectedFilters: string[] = [];

	const dispatch = createEventDispatcher();

	function removeTag(tag: string) {
		selectedFilters = selectedFilters.filter((t) => t !== tag);
		dispatch('filterChanged', selectedFilters);
	}

	function onCloudDownload() {
		alert('Not yet implemented');
	}
</script>

<div class="container">
	<div class="top-bar">
		<SearchBar {onSearch} />
		<FilterButton onClick={onFilterClick} />
		<CloudDownload onClick={onCloudDownload} />
	</div>
	{#if selectedFilters?.length > 0}
		<div class="selected-filters">
			{#each selectedFilters as tag}
				<Tag {tag} onRemove={removeTag} />
			{/each}
		</div>
	{/if}
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

	h1 {
		font-size: 2.5rem;
		margin-bottom: 0.5rem;
	}

	.selected-filters {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}
</style>