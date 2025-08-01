<script lang="ts">
	import { onMount } from 'svelte';
	import { apiRequest } from '$lib/api/config';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import ModalDialog from '$lib/components/dialogs/ModalDialog.svelte';
	import AvatarDetail from '$lib/avatars/AvatarDetail.svelte';
	import AvatarFilter from '$lib/avatars/AvatarFilter.svelte';
	import AvatarCard from '$lib/avatars/AvatarCard.svelte';
	import type { Avatar } from '$lib/avatars/Avatar.types';

	let avatars: Avatar[] = [];
	let allAvatars: Avatar[] = [];
	let loading = true;
	let error: string | null = null;

	let selectedAvatar: Avatar | null = null;
	let showModal = false;
	let showFilterModal = false;

	let selectedFilters: string[] = [];

	let currentSearchQuery = '';

	async function fetchAvatars(search = '', offset = 0, limit = 20): Promise<Avatar[]> {
		try {
			loading = true;
			error = null;

			const params = new URLSearchParams();
			if (search) params.append('search', search);
			if (offset) params.append('offset', offset.toString());
			if (limit) params.append('limit', limit.toString());

			console.log('Fetching avatars with params:', params.toString());
			const data = await apiRequest(`/avatars?${params}`);
			console.log('Received avatars data:', data);
			console.log('Type of data:', typeof data);
			console.log('Data structure:', Array.isArray(data) ? 'Array' : 'Object', data);

			// Check if data is wrapped in an object
			const avatarsArray = Array.isArray(data) ? data : data.avatars || data.items || data.data || [];
			console.log('Processed avatars array:', avatarsArray);
			console.log('Number of avatars:', avatarsArray.length);

			return avatarsArray;
		} catch (err) {
			console.error('Error fetching avatars:', err);

			// For development/testing, return mock data if localhost is not available
			console.warn('Using mock data for development');

			// Return mock data filtered by search
			return [
				{
					id: '1',
					name: 'Athletic Male Avatar',
					description: 'A versatile male avatar suitable for various workout demonstrations',
					gender: 'Male',
					categories: ['Athletic', 'Male', 'Standard'],
					fileName: 'athletic_male.fbx',
					screenshot: '/api/placeholder/400/300',
					createdAt: '2024-01-15T10:00:00Z',
					createdBy: 'admin'
				},
				{
					id: '2',
					name: 'Athletic Female Avatar',
					description: 'A versatile female avatar suitable for various workout demonstrations',
					gender: 'Female',
					categories: ['Athletic', 'Female', 'Standard'],
					fileName: 'athletic_female.fbx',
					screenshot: '/api/placeholder/400/300',
					createdAt: '2024-01-16T10:00:00Z',
					createdBy: 'admin'
				},
				{
					id: '3',
					name: 'Beginner Male Avatar',
					description: 'A male avatar designed for beginner-level workouts',
					gender: 'Male',
					categories: ['Beginner', 'Male'],
					fileName: 'beginner_male.fbx',
					screenshot: '/api/placeholder/400/300',
					createdAt: '2024-01-17T10:00:00Z',
					createdBy: 'trainer1'
				}
			].filter(avatar =>
				!search ||
				avatar.name?.toLowerCase().includes(search.toLowerCase()) ||
				avatar.description?.toLowerCase().includes(search.toLowerCase()) ||
				avatar.categories?.some(cat => cat.toLowerCase().includes(search.toLowerCase()))
			);
		} finally {
			loading = false;
		}
	}

	function filterAvatars(
		avatars: Avatar[],
		search: string,
		filters: string[]
	): Avatar[] {
		const lowerCaseSearch = search.toLowerCase();

		const categoryFilters = filters
			.filter((f) => f.startsWith('category:'))
			.map((f) => f.replace('category:', ''));
		const genderFilters = filters
			.filter((f) => f.startsWith('gender:'))
			.map((f) => f.replace('gender:', ''));

		return avatars.filter((avatar) => {
			const matchesSearch =
				!search ||
				(avatar.name?.toLowerCase().includes(lowerCaseSearch) ?? false) ||
				(avatar.description?.toLowerCase().includes(lowerCaseSearch) ?? false);

			const matchesCategory =
				categoryFilters.length === 0 ||
				categoryFilters.every((cat) => avatar.categories?.includes(cat) ?? false);

			const matchesGender =
				genderFilters.length === 0 || genderFilters.includes(avatar.gender ?? '');

			return matchesSearch && matchesCategory && matchesGender;
		});
	}

	async function applyFiltersAndSearch() {
		loading = true;
		error = null;
		try {
			if (allAvatars.length === 0) {
				allAvatars = await fetchAvatars(); // Fetch all avatars only once
			}
			avatars = filterAvatars(allAvatars, currentSearchQuery, selectedFilters);
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

	function openAvatarModal(avatar: Avatar) {
		selectedAvatar = avatar;
		showModal = true;
	}

	function closeAvatarModal() {
		showModal = false;
		selectedAvatar = null;
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

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			closeAvatarModal();
			closeFilterModal();
		}
	}

	onMount(async () => {
		await applyFiltersAndSearch();
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<SearchPage
	title="Avatars"
	description="Browse through all available avatars."
	onSearch={handleSearch}
	onFilterClick={openFilterModal}
	on:filterChanged={(event) => {
		selectedFilters = event.detail;
		handleFilterUpdate(event.detail);
	}}
	bind:selectedFilters
>
	<div class="container">
		{#if loading}
			<div class="loading">Loading avatars...</div>
		{:else if error}
			<div class="error">Error: {error}</div>
		{:else if avatars.length === 0}
			<div class="no-results">No avatars found.</div>
		{:else}
			{#each avatars as avatar}
				<AvatarCard {avatar} onClick={openAvatarModal} />
			{/each}
		{/if}
	</div>
</SearchPage>

{#if showModal && selectedAvatar}
	<ModalDialog title={selectedAvatar.name ?? 'Unknown'} on:close={closeAvatarModal}>
		<AvatarDetail avatar={selectedAvatar} />
	</ModalDialog>
{/if}

{#if showFilterModal}
	<ModalDialog title="Filter Avatars" on:close={closeFilterModal}>
		<AvatarFilter selectedFilters={selectedFilters} onFilter={handleFilterUpdate} />
	</ModalDialog>
{/if}

<style>
	.container {
		padding: 1rem 2rem;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 1rem;
	}



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