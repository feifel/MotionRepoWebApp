<script lang="ts">
	import CloseButton from '$lib/components/elements/CloseButton.svelte';
	import { createEventDispatcher } from 'svelte';

	export let title: string;

	const dispatch = createEventDispatcher();

	function closeModal() {
		dispatch('close');
	}

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			closeModal();
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeModal();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
		class="modal-backdrop"
		on:click={handleBackdropClick}
		on:keydown={handleKeydown}
		role="button"
		tabindex="0"
		aria-label="Close modal"
>
	<div class="modal-content">
		<div class="modal-header">
			<h1>{title}</h1>
			<CloseButton onClose={closeModal} />
		</div>

		<slot/>
	</div>
</div>

<style>
	.modal-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		padding-top: 5vh;
		z-index: 1000;
		animation: fadeIn 0.2s ease-out;
	}

	.modal-content {
		background-color: var(--color-bg-neutral);
		border-radius: 8px;
		border: 1px solid var(--color-primary-shade1);
		max-width: 800px;
		width: 100%;
		max-height: 80vh;
		margin-bottom: 2rem;
		box-shadow: 0 10px 30px var(--color-bg-neutral-shade1);
		animation: slideIn 0.2s ease-out;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
		border-bottom: 1px solid var(--color-primary-shade1);
		background: var(--color-bg-neutral);
		flex-shrink: 0;
		justify-content: space-between;
		align-items: center;
		padding: 1.5rem;
	}

	.modal-header h1 {
		margin: 0;
		font-size: 1.5rem;
	}
</style>