<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	interface Motion {
		id?: string;
		name?: string;
		description?: string;
		file?: string;
		fileType?: string;
		screenshot?: string;
		level?: number;
		equipment?: string[];
		bodyParts?: string[];
		muscleGroups?: string[];
		categories?: string[];
		primaryJoints?: string[];
		labels?: string[];
		fileSize?: number;
		duration?: number;
		uploadDate?: string;
		author?: string;
	}

	export let motion: Motion;

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
			<h1>{motion.name || 'Unnamed Motion'}</h1>
			<button class="close-button" on:click={closeModal} aria-label="Close modal">
				&times;
			</button>
		</div>

		<div class="modal-body">
			{#if motion.screenshot}
				<div class="screenshot-container">
					<img src={motion.screenshot} alt={motion.name || 'Motion screenshot'} class="screenshot" />
				</div>
			{/if}

			<div class="info-grid">
				{#if motion.description}
					<section class="info-section">
						<h3>Description</h3>
						<p>{motion.description}</p>
					</section>
				{/if}

				<section class="info-section">
					<h3>Basic Information</h3>
					<div class="info-list">
						{#if motion.fileType}
							<div class="info-item">
								<span class="label">File Type:</span>
								<span class="value">{motion.fileType}</span>
							</div>
						{/if}
						{#if motion.level !== undefined}
							<div class="info-item">
								<span class="label">Level:</span>
								<span class="value">{motion.level}</span>
							</div>
						{/if}
						{#if motion.file}
							<div class="info-item">
								<span class="label">File Name:</span>
								<span class="value">{motion.file}</span>
							</div>
						{/if}
						{#if motion.fileSize}
							<div class="info-item">
								<span class="label">File Size:</span>
								<span class="value">{motion.fileSize} MB</span>
							</div>
						{/if}
						{#if motion.duration}
							<div class="info-item">
								<span class="label">Duration:</span>
								<span class="value">{motion.duration}s</span>
							</div>
						{/if}
						{#if motion.uploadDate}
							<div class="info-item">
								<span class="label">Upload Date:</span>
								<span class="value">{new Date(motion.uploadDate).toLocaleDateString()}</span>
							</div>
						{/if}
						{#if motion.author}
							<div class="info-item">
								<span class="label">Author:</span>
								<span class="value">{motion.author}</span>
							</div>
						{/if}
					</div>
				</section>

				{#if motion.equipment && motion.equipment.length > 0}
					<section class="info-section">
						<h3>Equipment</h3>
						<div class="tag-list">
							{#each motion.equipment as item}
								<span class="tag">{item}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if motion.bodyParts && motion.bodyParts.length > 0}
					<section class="info-section">
						<h3>Body Parts</h3>
						<div class="tag-list">
							{#each motion.bodyParts as part}
								<span class="tag">{part}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if motion.muscleGroups && motion.muscleGroups.length > 0}
					<section class="info-section">
						<h3>Muscle Groups</h3>
						<div class="tag-list">
							{#each motion.muscleGroups as group}
								<span class="tag">{group}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if motion.categories && motion.categories.length > 0}
					<section class="info-section">
						<h3>Categories</h3>
						<div class="tag-list">
							{#each motion.categories as category}
								<span class="tag">{category}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if motion.primaryJoints && motion.primaryJoints.length > 0}
					<section class="info-section">
						<h3>Primary Joints</h3>
						<div class="tag-list">
							{#each motion.primaryJoints as joint}
								<span class="tag">{joint}</span>
							{/each}
						</div>
					</section>
				{/if}

				{#if motion.labels && motion.labels.length > 0}
					<section class="info-section">
						<h3>Labels</h3>
						<div class="tag-list">
							{#each motion.labels as label}
								<span class="tag">{label}</span>
							{/each}
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
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
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
		font-size: 1.5rem;
		cursor: pointer;
		color: var(--color-text);
		padding: 0.25rem;
		line-height: 1;
		transition: color 0.2s ease;
	}

	.close-button:hover {
		color: var(--color-text-secondary);
	}

	.modal-body {
		padding: 1.5rem;
		overflow-y: auto;
		flex: 1;
	}

	.screenshot-container {
		background: var(--color-bg-2);
		border-radius: 0.5rem;
		padding: 1rem;
		border: 1px solid var(--color-border);
		margin-bottom: 1.5rem;
	}

	.screenshot {
		width: 100%;
		height: auto;
		border-radius: 0.25rem;
		object-fit: cover;
	}

	.info-grid {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.info-section {
		background: var(--color-bg-2);
		border-radius: 0.5rem;
		padding: 1.5rem;
		border: 1px solid var(--color-border);
	}

	.info-section h3 {
		margin: 0 0 1rem 0;
		color: var(--color-text);
		font-size: 1.1rem;
		font-weight: 600;
	}

	.info-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.info-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
	}

	.info-item:last-child {
		border-bottom: none;
	}

	.label {
		font-weight: 600;
		color: var(--color-text-secondary);
	}

	.value {
		color: var(--color-text);
	}

	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: var(--color-bg-3);
		color: var(--color-text);
		padding: 0.25rem 0.75rem;
		border-radius: 1rem;
		font-size: 0.875rem;
		border: 1px solid var(--color-border);
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

		.modal-body {
			padding: 1rem;
		}
	}
</style>