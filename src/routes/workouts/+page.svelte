<script lang="ts">
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/config';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import ModalDialog from '$lib/components/dialogs/ModalDialog.svelte';
	import WorkoutDetail from '$lib/workouts/WorkoutDetail.svelte';
	import WorkoutFilter from '$lib/workouts/WorkoutFilter.svelte';
	import WorkoutCard from '$lib/workouts/WorkoutCard.svelte';
	import type { Workout } from '$lib/workouts/Workout.types';

	let workouts: Workout[] = [];
	let allWorkouts: Workout[] = [];
	let loading = true;
	let error: string | null = null;
	let selectedWorkout: Workout | null = null;
	let showModal = false;
	let showFilterModal = false;

	let selectedFilters: string[] = [];

	let currentSearchQuery = '';

	async function fetchWorkouts(search = '', offset = 0, limit = 20): Promise<Workout[]> {
		try {
			loading = true;
			error = null;

			const params = new URLSearchParams();
			if (search) params.append('search', search);
			if (offset) params.append('offset', offset.toString());
			if (limit) params.append('limit', limit.toString());

			const data = await apiRequest(`/workouts?${params}`);
			const workoutsArray = Array.isArray(data) ? data : data.workouts || data.items || data.data || [];

			return workoutsArray;
		} catch (err) {
			console.error('Error fetching workouts:', err);

			// Mock data for development
			return [
				{
					id: '1',
					name: 'Full Body Strength',
					description: 'A comprehensive full body workout focusing on strength building',
					difficulty: 'Intermediate',
					duration: 45,
					equipment: ['Dumbbells', 'Barbell', 'Bench'],
					bodyParts: ['Chest', 'Back', 'Legs', 'Shoulders', 'Arms'],
					muscleGroups: ['Pectorals', 'Latissimus Dorsi', 'Quadriceps', 'Deltoids', 'Biceps', 'Triceps'],
					categories: ['Strength', 'Full Body'],
					exercises: ['Bench Press', 'Squats', 'Deadlifts', 'Shoulder Press', 'Bicep Curls'],
					screenshot: '/api/placeholder/400/300',
					createdAt: '2024-01-15T10:00:00Z',
					createdBy: 'trainer1'
				},
				{
					id: '2',
					name: 'HIIT Cardio Blast',
					description: 'High-intensity interval training for maximum calorie burn',
					difficulty: 'Advanced',
					duration: 30,
					equipment: ['None'],
					bodyParts: ['Full Body'],
					muscleGroups: ['Core', 'Legs', 'Glutes'],
					categories: ['Cardio', 'HIIT'],
					exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats', 'High Knees', 'Plank Jacks'],
					screenshot: '/api/placeholder/400/300',
					createdAt: '2024-01-16T10:00:00Z',
					createdBy: 'trainer2'
				},
				{
					id: '3',
					name: 'Beginner Core Routine',
					description: 'Gentle introduction to core strengthening exercises',
					difficulty: 'Beginner',
					duration: 20,
					equipment: ['Yoga Mat'],
					bodyParts: ['Core', 'Abs'],
					muscleGroups: ['Rectus Abdominis', 'Obliques', 'Transverse Abdominis'],
					categories: ['Core', 'Beginner'],
					exercises: ['Plank', 'Crunches', 'Russian Twists', 'Leg Raises', 'Bird Dog'],
					screenshot: '/api/placeholder/400/300',
					createdAt: '2024-01-17T10:00:00Z',
					createdBy: 'trainer1'
				}
			].filter(workout =>
				!search ||
				workout.name?.toLowerCase().includes(search.toLowerCase()) ||
				workout.description?.toLowerCase().includes(search.toLowerCase()) ||
				workout.categories?.some(cat => cat.toLowerCase().includes(search.toLowerCase()))
			);
		} finally {
			loading = false;
		}
	}

	function filterWorkouts(
		workouts: Workout[],
		search: string,
		filters: string[]
	): Workout[] {
		const lowerCaseSearch = search.toLowerCase();

		const categoryFilters = filters
			.filter((f) => f.startsWith('category:'))
			.map((f) => f.replace('category:', ''));
		const difficultyFilters = filters
			.filter((f) => f.startsWith('difficulty:'))
			.map((f) => f.replace('difficulty:', ''));

		return workouts.filter((workout) => {
			const matchesSearch =
				!search ||
				(workout.name?.toLowerCase().includes(lowerCaseSearch) ?? false) ||
				(workout.description?.toLowerCase().includes(lowerCaseSearch) ?? false);

			const matchesCategory =
				categoryFilters.length === 0 ||
				categoryFilters.every((cat) => workout.categories?.includes(cat) ?? false);

			const matchesDifficulty =
				difficultyFilters.length === 0 || difficultyFilters.includes(workout.difficulty ?? '');

			return matchesSearch && matchesCategory && matchesDifficulty;
		});
	}

	async function applyFiltersAndSearch() {
		loading = true;
		error = null;
		try {
			if (allWorkouts.length === 0) {
				allWorkouts = await fetchWorkouts();
			}
			workouts = filterWorkouts(allWorkouts, currentSearchQuery, selectedFilters);
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

	function openWorkoutModal(workout: Workout) {
		selectedWorkout = workout;
		showModal = true;
	}

	function closeWorkoutModal() {
		showModal = false;
		selectedWorkout = null;
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
			closeWorkoutModal();
			closeFilterModal();
		}
	}

	onMount(async () => {
		await applyFiltersAndSearch();
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<SearchPage
	title="Workouts"
	description="Browse and search for workouts."
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
			<div class="loading">Loading workouts...</div>
		{:else if error}
			<div class="error">Error: {error}</div>
		{:else if workouts.length === 0}
			<div class="no-results">No workouts found.</div>
		{:else}
			{#each workouts as workout}
				<WorkoutCard {workout} onClick={openWorkoutModal} />
			{/each}
		{/if}
	</div>
</SearchPage>

{#if showModal && selectedWorkout}
	<ModalDialog on:close={closeWorkoutModal} title={selectedWorkout.name ?? 'Unknown'}>
		<WorkoutDetail workout={selectedWorkout} />
	</ModalDialog>
{/if}

{#if showFilterModal}
	<ModalDialog title="Filter Workouts" on:close={closeFilterModal}>
		<WorkoutFilter selectedFilters={selectedFilters} onFilter={handleFilterUpdate} />
	</ModalDialog>
{/if}

<style>
	.loading,
	.error,
	.no-results {
		text-align: center;
		padding: 2rem;
		color: var(--color-neutral);
	}

	.error {
		color: var(--color-error);
	}
</style>