<script lang="ts">
	interface Props {
		id: string;
		existingTags?: string[];
		selectedTags?: string[];
		onTagsChange?: (tags: string[]) => void;
		readonly?: boolean;
	}

	let {
		id = '',
		existingTags = [],
		selectedTags = $bindable([]),
		onTagsChange,
		readonly = false
	}: Props = $props();

	let searchTerm = $state('');
	let showDropdown = $state(false);
	let showAllTagsDropdown = $state(false);
	let inputElement = $state<HTMLInputElement>();

	let allTags = $derived([...new Set([...existingTags, ...selectedTags])]);

	let filteredTags = $derived(
		allTags.filter(
			(tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedTags.includes(tag)
		)
	);

	let canCreateNew = $derived(
		searchTerm.trim() && !allTags.some((tag) => tag.toLowerCase() === searchTerm.toLowerCase())
	);

	function selectTag(tag: string) {
		if (!selectedTags.includes(tag)) {
			selectedTags = [...selectedTags, tag];
			onTagsChange?.(selectedTags);
		}
		searchTerm = '';
		showDropdown = false;
		showAllTagsDropdown = false;
		inputElement?.focus();
	}

	function toggleTag(tag: string) {
		if (selectedTags.includes(tag)) {
			selectedTags = selectedTags.filter((t) => t !== tag);
		} else {
			selectedTags = [...selectedTags, tag];
		}
		onTagsChange?.(selectedTags);
	}

	function createNewTag() {
		const trimmedName = searchTerm.trim();
		if (trimmedName) {
			selectTag(trimmedName);
		}
	}

	function removeTag(tag: string) {
		selectedTags = selectedTags.filter((t) => t !== tag);
		onTagsChange?.(selectedTags);
	}

	function handleInput(event: Event) {
		searchTerm = (event.target as HTMLInputElement).value;
		showDropdown = searchTerm.trim().length > 0;
		showAllTagsDropdown = false;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (canCreateNew) {
				createNewTag();
			} else if (filteredTags.length > 0) {
				selectTag(filteredTags[0]);
			}
		} else if (event.key === 'Escape') {
			showDropdown = false;
			showAllTagsDropdown = false;
			inputElement?.blur();
		}
	}

	function handleClickOutside(event: MouseEvent) {
		if (!(event.target as HTMLElement).closest('.input-container')) {
			showDropdown = false;
			showAllTagsDropdown = false;
		}
	}

	function toggleAllTagsDropdown() {
		showAllTagsDropdown = !showAllTagsDropdown;
		showDropdown = false;
	}

	$effect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="tag-selector" class:rowspan={!readonly}>
	{#if !readonly}
		<div class="input-container">
			<input
				{id}
				type="text"
				class="tag-input"
				placeholder="Type to search or create tags..."
				bind:value={searchTerm}
				bind:this={inputElement}
				oninput={handleInput}
				onkeydown={handleKeydown}
				onfocus={() => (showDropdown = searchTerm.trim().length > 0)}
			/>

			<button
				class="dropdown-toggle"
				type="button"
				aria-label="dropdown"
				onclick={toggleAllTagsDropdown}
			>
				<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
					<path d="M8 11L3 6h10z" />
				</svg>
			</button>

			{#if showDropdown}
				<div class="dropdown">
					{#each filteredTags as tag, index}
						<div
							class="dropdown-item"
							role="option"
							tabindex="0"
							aria-selected=false
							onclick={() => selectTag(tag)}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									selectTag(tag);
								}
							}}
						>
							{tag}
						</div>
					{/each}

					{#if canCreateNew}
						<div
							class="dropdown-item create-new"
							role="option"
							tabindex="0"
							aria-selected="false"
							onclick={createNewTag}
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									createNewTag();
								}
							}}
						>
							Create "{searchTerm}"
						</div>
					{/if}
				</div>
			{/if}

			{#if showAllTagsDropdown}
				<div class="dropdown all-tags-dropdown">
					{#each allTags as tag}
						<label class="dropdown-item checkbox-item">
							<input
								type="checkbox"
								checked={selectedTags.includes(tag)}
								onchange={() => toggleTag(tag)}
							/>
							<span>{tag}</span>
						</label>
					{/each}
					{#if allTags.length === 0}
						<div class="dropdown-item disabled">No tags available</div>
					{/if}
				</div>
			{/if}
		</div>
	{/if}
	<div class="selected-tags">
		{#each selectedTags as tag}
			<span class="tag">
				{tag}
				{#if !readonly}
					<span
						class="tag-remove"
						role="button"
						tabindex="0"
						aria-label="Remove tag {tag}"
						onclick={() => removeTag(tag)}
						onkeydown={(e) => {
							if (e.key === 'Enter' || e.key === ' ') {
								e.preventDefault();
								removeTag(tag);
							}
						}}>×</span
					>
				{/if}
			</span>
		{/each}
	</div>

	{#if selectedTags.length === 0}
		<div class="no-tags">Nothing selected</div>
	{/if}
</div>

<style>
	label {
		font-size: 1.1rem;
		font-weight: bold;
	}

	.rowspan {
		grid-row: span 2;
	}

	.input-container {
		position: relative;
		width: 100%;
	}

	.tag-input {
		background: var(--color-bg-neutral);
		border: 1px solid var(--color-primary);
		border-radius: 4px;
		padding: 0.5rem 1rem 0.5rem 0.5rem; /* Added right padding */
		color: var(--color-neutral-tint1);
		width: 100%;
		box-sizing: border-box;
	}

	.tag-input:focus {
		outline: none;
		border-color: var(--color-primary-tint1);
		box-shadow: 0 0 0 2px var(--color-primary);
	}

	.dropdown-toggle {
		position: absolute;
		right: 8px;
		top: 50%;
		transform: translateY(-50%);
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px;
		color:var(--color-primary);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dropdown-toggle:hover {
		color: #007bff;
	}

	.dropdown {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		border: 1px solid var(--color-primary-shade1);
		border-radius: 6px;
		margin-top: 4px;
		max-height: 200px;
		overflow-y: auto;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.all-tags-dropdown {
		max-height: 300px;
	}

	.dropdown-item {
		padding: 10px 16px;
		cursor: pointer;
		border-bottom: 1px solid var(--color-primary-shade1);
		font-size: 14px;
		background: var(--color-bg-neutral);
	}

	.dropdown-item:hover {
		background: var(--color-bg-neutral-tint1);
	}

	.dropdown-item:last-child {
		border-bottom: none;
	}

	.checkbox-item {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 8px;
	}

	.checkbox-item input[type='checkbox'] {
		margin: 0;
		cursor: pointer;
	}

	.create-new {
		font-weight: 500;
	}

	.create-new:hover {
		background: var(--color-bg-neutral-tint1);
	}

	.disabled {
		color: #999;
		cursor: not-allowed;
	}

	.selected-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 0.7rem 0rem 0.7rem 0rem;
	}

	.tag {
		display: inline-block;
		background: var(--color-primary-shade1);
		color: var(--color-neutral-tint1);
		padding: 0.3rem 0.7rem;
		align-items: center;
		border-radius: 16px;
		font-size: 0.8rem;
		font-weight: 500;
	}

	.tag-remove {
		margin-left: 6px;
		cursor: pointer;
		font-size: 16px;
		line-height: 1;
		opacity: 0.8;
	}

	.tag-remove:hover {
		opacity: 1;
	}

	.no-tags {
		color: #666;
		font-style: italic;
		margin-top: 16px;
	}
</style>
