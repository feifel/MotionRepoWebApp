<script lang="ts">
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/config';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import ModalDialog from '$lib/components/dialogs/ModalDialog.svelte';
	import MotionDetail from '$lib/components/MotionDetail.svelte';

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
	}

	let motions: Motion[] = [];
	let loading = true;
	let error: string | null = null;
	let selectedMotion: Motion | null = null;
	let showModal = false;

	async function fetchMotions(search = '', offset = 0, limit = 20): Promise<Motion[]> {
		try {
			loading = true;
			error = null;

			const params = new URLSearchParams();
			if (search) params.append('search', search);
			if (offset) params.append('offset', offset.toString());
			if (limit) params.append('limit', limit.toString());

			console.log('Fetching motions with params:', params.toString());
			const data = await apiRequest(`/motions?${params}`);
			console.log('Received motions data:', data);
			
			const motionsArray = Array.isArray(data) ? data : data.motions || data.items || data.data || [];
			console.log('Processed motions array:', motionsArray);
			
			return motionsArray;
		} catch (err) {
			console.error('Error fetching motions:', err);

			// For development/testing, return mock data if localhost is not available
			console.warn('Using mock data for development');
			
			return [
				{
					id: '1',
					name: 'Walking Motion',
					description: 'Natural walking cycle for human characters',
					file: 'walking_motion.fbx',
					fileType: 'FBX',
					level: 1,
					equipment: ['None'],
					bodyParts: ['Legs', 'Arms', 'Core'],
					muscleGroups: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes'],
					categories: ['Locomotion', 'Basic'],
					primaryJoints: ['Hip', 'Knee', 'Ankle', 'Shoulder'],
					labels: ['natural', 'locomotion', 'cycle', 'human'],
					screenshot: '/api/placeholder/400/300'
				},
				{
					id: '2',
					name: 'Running Sprint',
					description: 'High-intensity sprinting motion for athletic characters',
					file: 'running_sprint.fbx',
					fileType: 'FBX',
					level: 3,
					equipment: ['Running Shoes'],
					bodyParts: ['Legs', 'Arms', 'Core', 'Full Body'],
					muscleGroups: ['Quadriceps', 'Hamstrings', 'Calves', 'Glutes', 'Core'],
					categories: ['Locomotion', 'Athletic', 'High Intensity'],
					primaryJoints: ['Hip', 'Knee', 'Ankle', 'Elbow', 'Shoulder'],
					labels: ['sprint', 'athletic', 'high-energy', 'sport'],
					screenshot: '/api/placeholder/400/300'
				},
				{
					id: '3',
					name: 'Boxing Jab Cross',
					description: 'Basic boxing combination with jab and cross punches',
					file: 'boxing_combo.fbx',
					fileType: 'FBX',
					level: 2,
					equipment: ['Boxing Gloves'],
					bodyParts: ['Arms', 'Shoulders', 'Core', 'Legs'],
					muscleGroups: ['Deltoids', 'Biceps', 'Triceps', 'Core', 'Legs'],
					categories: ['Combat', 'Upper Body', 'Athletic'],
					primaryJoints: ['Shoulder', 'Elbow', 'Wrist', 'Hip', 'Knee'],
					labels: ['boxing', 'combat', 'striking', 'combination'],
					screenshot: '/api/placeholder/400/300'
				},
				{
					id: '4',
					name: 'Yoga Sun Salutation',
					description: 'Flowing yoga sequence connecting breath with movement',
					file: 'yoga_sun_salutation.fbx',
					fileType: 'FBX',
					level: 2,
					equipment: ['Yoga Mat'],
					bodyParts: ['Full Body', 'Arms', 'Legs', 'Core'],
					muscleGroups: ['Full Body', 'Core', 'Shoulders', 'Legs'],
					categories: ['Yoga', 'Flexibility', 'Wellness'],
					primaryJoints: ['Spine', 'Shoulder', 'Hip', 'Knee', 'Ankle'],
					labels: ['yoga', 'flow', 'wellness', 'flexibility'],
					screenshot: '/api/placeholder/400/300'
				}
			];
		}
	}

	async function handleSearch(query: string) {
		console.log('Search triggered with query:', query);
		motions = await fetchMotions(query);
		console.log('Motions updated after search, length:', motions.length);
	}

	function openMotionModal(motion: Motion) {
		selectedMotion = motion;
		showModal = true;
	}

	function closeMotionModal() {
		showModal = false;
		selectedMotion = null;
	}

	// Handle Escape key to close modal
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showModal) {
			closeMotionModal();
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});

	onMount(async () => {
		console.log('Component mounted, fetching initial motions...');
		motions = await fetchMotions();
		loading = false;
		console.log('Initial motions loaded, length:', motions.length);
	});
</script>

<SearchPage
	title="Motions"
	description="Browse and search for motions."
	onSearch={handleSearch}
>
	<div class="result-grid">
		{#if loading}
			<div class="loading">Loading motions...</div>
		{:else if error}
			<div class="error">Error: {error}</div>
		{:else if motions.length === 0}
			<div class="no-results">No motions found.</div>
		{:else}
			{#each motions as motion}
				<div class="result-card" on:click={() => openMotionModal(motion)} role="button" tabindex="0" on:keydown={(e) => e.key === 'Enter' && openMotionModal(motion)}>
					<h3>{motion.name || 'Unnamed Motion'}</h3>
					<p>{motion.description || 'No description available.'}</p>
					<div class="motion-details">
						{#if motion.fileType}
							<span class="file-type">{motion.fileType}</span>
						{/if}
						{#if motion.level !== undefined}
							<span class="level">Level {motion.level}</span>
						{/if}
						{#if motion.file}
							<span class="file-name">{motion.file}</span>
						{/if}
					</div>
					{#if motion.categories && motion.categories.length > 0}
						<div class="categories">
							{#each motion.categories as category}
								<span class="category">{category}</span>
							{/each}
						</div>
					{/if}
					{#if motion.bodyParts && motion.bodyParts.length > 0}
						<div class="body-parts">
							<strong>Body Parts:</strong>
							{#each motion.bodyParts as part}
								<span class="body-part">{part}</span>
							{/each}
						</div>
					{/if}
					{#if motion.muscleGroups && motion.muscleGroups.length > 0}
						<div class="muscle-groups">
							<strong>Muscle Groups:</strong>
							{#each motion.muscleGroups as muscle}
								<span class="muscle-group">{muscle}</span>
							{/each}
						</div>
					{/if}
					{#if motion.equipment && motion.equipment.length > 0}
						<div class="equipment">
							<strong>Equipment:</strong>
							{#each motion.equipment as equip}
								<span class="equip">{equip}</span>
							{/each}
						</div>
					{/if}
					{#if motion.labels && motion.labels.length > 0}
						<div class="labels">
							{#each motion.labels as label}
								<span class="label">{label}</span>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</SearchPage>

{#if showModal && selectedMotion}
	<ModalDialog on:close={closeMotionModal} title={selectedMotion.name ?? 'Unknown'}>
		<MotionDetail motion={selectedMotion} />
	</ModalDialog>
{/if}

<style>
	.motion-details {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
		font-size: 0.875rem;
		flex-wrap: wrap;
	}

	.motion-details span {
		background: var(--surface-2);
		padding: 0.25rem 0.5rem;
		border-radius: 4px;
		color: var(--text-2);
	}

	.categories,
	.body-parts,
	.muscle-groups,
	.equipment,
	.labels {
		margin-bottom: 0.75rem;
		font-size: 0.875rem;
	}

	.body-parts strong,
	.muscle-groups strong,
	.equipment strong {
		margin-right: 0.5rem;
		color: var(--text-1);
	}

	.category,
	.body-part,
	.muscle-group,
	.equip,
	.label {
		display: inline-block;
		background: var(--surface-3);
		color: var(--text-2);
		padding: 0.125rem 0.375rem;
		border-radius: 3px;
		margin-right: 0.25rem;
		font-size: 0.75rem;
	}

	@media (max-width: 768px) {
		.result-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>