<script lang="ts">
  export let label: string;
  export let value: string | undefined;
</script>

{#if value && value.length > 0}
    <div class="info-item">
        <span class="label">{label}</span> 
        <span class="value">{value}</span>
    </div>
{/if}

<style>
	.info-item {
        display: flex;
        justify-content: space-between;
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--color-bg-neutral);
	}
</style>