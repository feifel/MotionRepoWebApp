<script lang="ts">
  export let onClose = () => {};
</script>

<button class="close-button" on:click={onClose} aria-label="Close modal">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
</button>

<style>
    .close-button {
        border: none;
        background-color: var(--color-bg-neutral-tint1);
        color: var(--color-primary);
        cursor: pointer;
        padding: 0.5rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .close-button:hover {
        color: var(--color-primary-tint1);
    }
</style>