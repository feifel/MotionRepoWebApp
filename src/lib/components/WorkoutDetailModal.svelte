<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Workout {
		id?: string;
		name?: string;
		description?: string;
		difficulty?: string;
		duration?: number;
		equipment?: string[];
		bodyParts?: string[];
		muscleGroups?: string[];
		categories?: string[];
		exercises?: string[];
		file?: string;
		screenshot?: string;
		createdAt?: string;
		updatedAt?: string;
		createdBy?: string;
	}

	export let workout: Workout;

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
			<h1>{workout.name || 'Unnamed Workout'}</h1>
			<button class="close-button" on:click={closeModal} aria-label="Close modal">
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		</div>

		<div class="modal-body">
			{#if workout.screenshot}
				<div class="screenshot-container">
					<img src={workout.screenshot} alt={workout.name || 'Workout'} class="screenshot" />
				</div>
			{/if}

			<div class="info-grid">
				{#if workout.description}
					<section class="info-section">
						<h3>Description</h3>
						<p>{workout.description}</p>
					</section>
				{/if}

				<section class="info-section">
					<h3>Workout Information</h3>
					<div class="info-list">
						{#if workout.difficulty}
							<div class="info-item">
								<span class="label">Difficulty:</span>
								<span class="value">{workout.difficulty}</span>
							</div>
						{/if}
						{#if workout.duration}
							<div class="info-item">
								<span class="label">Duration:</span>
								<span class="value">{workout.duration} minutes</span>
							</div>
						{/if}
					</div>
				</section>

				{#if workout.equipment && workout.equipment.length > 0}
					<section class="info-section">
						<h3>Equipment</h3>
						<div class="tags">
							{#each workout.equipment as item}
								<span class="tag">{item}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if workout.bodyParts && workout.bodyParts.length > 0}
					<section class="info-section">
						<h3>Body Parts</h3>
						<div class="tags">
							{#each workout.bodyParts as part}
								<span class="tag">{part}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if workout.muscleGroups && workout.muscleGroups.length > 0}
					<section class="info-section">
						<h3>Muscle Groups</h3>
						<div class="tags">
							{#each workout.muscleGroups as group}
								<span class="tag">{group}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if workout.categories && workout.categories.length > 0}
					<section class="info-section">
						<h3>Categories</h3>
						<div class="tags">
							{#each workout.categories as category}
								<span class="tag">{category}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if workout.exercises && workout.exercises.length > 0}
					<section class="info-section">
						<h3>Exercises</h3>
						<div class="exercises-list">
							{#each workout.exercises as exercise}
								<div class="exercise-item">{exercise}</div>
							{/each}
						</div>
					</section>
				{/if}

				{#if workout.createdAt}
					<section class="info-section">
						<h3>Metadata</h3>
						<div class="info-list">
							{#if workout.createdAt}
								<div class="info-item">
									<span class="label">Created:</span>
									<span class="value">{new Date(workout.createdAt).toLocaleDateString()}</span>
								</div>
							{/if}
							{#if workout.updatedAt}
								<div class="info-item">
									<span class="label">Updated:</span>
									<span class="value">{new Date(workout.updatedAt).toLocaleDateString()}</span>
								</div>
							{/if}
							{#if workout.createdBy}
								<div class="info-item">
									<span class="label">Created By:</span>
									<span class="value">{workout.createdBy}</span>
								</div>
							{/if}
						</div>
					</section>
				{/if}
			</div>
		</div>
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
	}

	.modal-header h1 {
		margin: 0;
		font-size: 1.5rem;
	}

	.close-button {
		background: none;
		border: none;
		color: var(--color-neutral);
		cursor: pointer;
		padding: 0.5rem;
		border-radius: 50%;
		transition: background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		background-color: var(--color-bg-neutral-tint1);
		color: var(--color-primary);
	}

	.modal-body {
		padding: 2rem 2rem 3rem 2rem;
		overflow-y: auto;
		max-height: 400px;
		flex: 1;
	}

	.screenshot-container {
		text-align: center;
		margin-bottom: 2rem;
	}

	.screenshot {
		max-width: 100%;
		max-height: 300px;
		border-radius: 8px;
		box-shadow: 0 4px 8px var(--color-bg-neutral-shade1);
	}

	.info-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-section h3 {
		margin: 0 0 0.75rem 0;
		color: var(--color-primary);
		font-size: 1.1rem;
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-bg-neutral);
	}

	.label {
		font-weight: 600;
		color: var(--color-neutral-tint1);
	}

	.value {
		color: var(--color-neutral);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background-color: var(--color-primary-shade1);
		color: var(--color-neutral-tint1);
		padding: 0.25rem 0.75rem;
		border-radius: 12px;
		font-size: 0.875rem;
	}

	.exercises-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.exercise-item {
		padding: 0.75rem;
		background-color: var(--color-bg-neutral-tint1);
		border-radius: 5px;
		border-left: 3px solid var(--color-primary);
	}

	@media (max-width: 768px) {
		.modal-backdrop {
			padding: 0.5rem;
		}

		.modal-content {
			max-height: 95vh;
			margin: 0.5rem;
		}

		.modal-header {
			padding: 1rem;
		}

		.modal-header h1 {
			font-size: 1.25rem;
		}

		.modal-body {
			padding: 1rem;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes slideIn {
		from {
			transform: translateY(-20px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
</style>