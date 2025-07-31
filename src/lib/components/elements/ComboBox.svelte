<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		id: string;
		allTags?: string[];
		selectedTags?: string[];
		children?: Snippet;
		readonly?: boolean;
	}

	let {
		id = '',
		allTags = [],
		selectedTags = $bindable([]),
		children,
		readonly = false
	}: Props = $props();

	let showAllTagsDropdown = $state(false);

	function toggleAllTagsDropdown(): void {
		if (readonly) return;
		showAllTagsDropdown = !showAllTagsDropdown;
	}

	function selectTag(tag: string): void {
		if (readonly) return;
		// Single select: replace the entire array with the new tag
		selectedTags = [tag];
	}
</script>

<div class="dropdown-container">
    <div class="dropdown-toggle" class:readonly>
        {#if selectedTags.length > 0}
            <span class="selected-tags">
                {selectedTags[0]}
            </span>
        {:else}
            <span class="placeholder">Select a tag...</span>
        {/if}

        {#if !readonly}
            <button
                class="dropdown-button"
                type="button"
                aria-label="dropdown"
                onclick={toggleAllTagsDropdown}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 11L3 6h10z" />
                </svg>
            </button>
        {/if}
    </div>

    {#if showAllTagsDropdown}
        <div class="dropdown all-tags-dropdown">
            {#each allTags as tag (tag)}
                <button
                    type="button"
                    class="dropdown-item"
                    onclick={() => {
                        selectTag(tag);
                        showAllTagsDropdown = false;
                    }}
                    aria-pressed={selectedTags.includes(tag)}
                >
                    {tag}
                </button>
            {/each}

            {#if allTags.length === 0}
                <div class="dropdown-item disabled">No tags available</div>
            {/if}
        </div>
    {/if}
</div>


<style>
    .dropdown-container {
        position: relative;
        display: inline-block;
    }

    .dropdown-toggle {
        position: relative;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        min-width: 150px;
        justify-content: space-between;
        background: var(--color-bg-neutral);
        border: 1px solid var(--color-primary);
        border-radius: 4px;
        padding: 0.5rem 0.7rem 0.5rem 0.5rem;
        color: var(--color-primary);
        width: 100%;
        box-sizing: border-box;
    }

    .dropdown-toggle.readonly {
        border: 0;
    }

    .dropdown-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        color: var(--color-primary);
        display: flex;
        align-items: center;
    }

    .selected-tags {
        color: var(--color-neutral-tint1);
        font-size: 0.875rem;
        user-select: text;
        cursor: text;
    }

    .placeholder {
        color: #888;
        font-size: 0.875rem;
        user-select: text;
        cursor: text;
    }

	.dropdown-toggle {
		position: relative;
		width: 100%;
	}

	.dropdown.all-tags-dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1000;
		margin-top: 0.25rem;
		border: 1px solid var(--color-primary);
		background: #fff0f5;
		max-height: 10rem;
		overflow-y: auto;
		width: 100%;
	}

	.dropdown {
		margin-top: 0.25rem;
		border: 1px solid #f8bbd0;
		background: #fff0f5;
		max-height: 10rem;
		overflow-y: auto;
		width: max-content;
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		border: 1px solid var(--color-primary);
		border-radius: 6px;
		margin-top: 4px;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.dropdown-item {
		display: block;
		width: 100%;
		text-align: left;
		background: none;
		border: none;
		padding: 0.5rem 0.75rem;
		cursor: pointer;
		color: var(--color-primary);

		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 8px;
		padding: 10px 16px;
		cursor: pointer;
		border-bottom: 1px solid var(--color-primary-shade1);
		font-size: 14px;
		background: var(--color-bg-neutral);
	}

	.dropdown-item:hover,
	.dropdown-item[aria-pressed='true'] {
		background: var(--color-bg-neutral-tint1);
	}

	.dropdown-item.disabled {
		color: #888;
		cursor: default;
	}
</style>
