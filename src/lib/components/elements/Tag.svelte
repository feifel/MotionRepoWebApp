<script lang="ts">
	export let tag: string;
	export let onRemove: ((tag: string) => void) | undefined = undefined;
	export let readonly: boolean = false;
</script>

<span class="filter-tag">{tag}
	{#if !readonly && onRemove}
		<span
			class="tag-remove"
			role="button"
			tabindex="0"
			aria-label="Remove tag {tag}"
			onclick={() => onRemove?.(tag)}
			onkeydown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					e.preventDefault();
					onRemove?.(tag);
				}
			}}>×</span>
	{/if}
</span>

<style>
	.filter-tag {
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
</style>