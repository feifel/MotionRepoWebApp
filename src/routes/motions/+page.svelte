<script lang="ts">
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/config';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import ModalDialog from '$lib/components/dialogs/ModalDialog.svelte';
	import MotionDetail from '$lib/motions/MotionDetail.svelte';
	import MotionFilter from '$lib/motions/MotionFilter.svelte';
	import MotionCard from '$lib/motions/MotionCard.svelte';
	import type { Motion } from '$lib/motions/Motion.types';

	let motions: Motion[] = []
	let allMotions: Motion[] = [];
	let loading = true;
	let error: string | null = null;
	let selectedMotion: Motion | null = null;
	let showModal = false;
	let showFilterModal = false;

	let selectedFilters: string[] = [];

	let currentSearchQuery = '';

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

	function filterMotions(
		motions: Motion[],
		search: string,
		filters: string[]
	): Motion[] {
		const lowerCaseSearch = search.toLowerCase();

		const categoryFilters = filters
			.filter((f) => f.startsWith('category:'))
			.map((f) => f.replace('category:', ''));
		const levelFilters = filters
			.filter((f) => f.startsWith('level:'))
			.map((f) => f.replace('level:', ''));

		return motions.filter((motion) => {
			const matchesSearch =
				!search ||
				(motion.name?.toLowerCase().includes(lowerCaseSearch) ?? false) ||
				(motion.description?.toLowerCase().includes(lowerCaseSearch) ?? false);

			const matchesCategory =
				categoryFilters.length === 0 ||
				categoryFilters.every((cat) => motion.categories?.includes(cat) ?? false);

			const levelMap: { [key: string]: number } = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
			const numericLevelFilters = levelFilters.map(l => levelMap[l]).filter(Boolean);

			const matchesLevel =
				numericLevelFilters.length === 0 || numericLevelFilters.includes(motion.level ?? 0);

			return matchesSearch && matchesCategory && matchesLevel;
		});
	}

	async function applyFiltersAndSearch() {
		loading = true;
		error = null;
		try {
			if (allMotions.length === 0) {
				allMotions = await fetchMotions(); // Fetch all motions only once
			}
			motions = filterMotions(allMotions, currentSearchQuery, selectedFilters);
		} catch (e: any) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	async function handleSearch(query: string) {
		currentSearchQuery = query;
		await applyFiltersAndSearch();
	}

	function openMotionModal(motion: Motion) {
		selectedMotion = motion;
		showModal = true;
	}

	function closeMotionModal() {
		showModal = false;
		selectedMotion = null;
	}

	function openFilterModal() {
		showFilterModal = true;
	}

	function closeFilterModal() {
		showFilterModal = false;
	}

	function handleFilterUpdate(event: string[]) {
		selectedFilters = event;
		closeFilterModal();
		applyFiltersAndSearch();
	}

	// Handle Escape key to close modal
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeMotionModal();
			closeFilterModal();
		}
	}

	onMount(async () => {
		await applyFiltersAndSearch();
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<SearchPage
	title="Motions"
	description="Browse and search for motions."
	onSearch={handleSearch}
	onFilterClick={openFilterModal}
	on:filterChanged={(event) => {
		selectedFilters = event.detail;
		handleFilterUpdate(event.detail);
	}}
	bind:selectedFilters
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
				<MotionCard {motion} onClick={openMotionModal} />
			{/each}
		{/if}
	</div>
</SearchPage>

{#if showModal && selectedMotion}
	<ModalDialog on:close={closeMotionModal} title={selectedMotion.name ?? 'Unknown'}>
		<MotionDetail motion={selectedMotion} />
	</ModalDialog>
{/if}

{#if showFilterModal}
	<ModalDialog title="Filter Motions" on:close={closeFilterModal}>
		<MotionFilter selectedFilters={selectedFilters} onFilter={handleFilterUpdate} />
	</ModalDialog>
{/if}

<style>
	@media (max-width: 768px) {
		.result-grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}
	}
</style>