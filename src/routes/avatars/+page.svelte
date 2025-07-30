<script lang="ts">
	import { apiRequest } from '$lib/api/config';
	import SearchPage from '$lib/components/SearchPage.svelte';
	import { onMount } from 'svelte';
	import AvatarDetailModal from '$lib/components/AvatarDetailModal.svelte';

	interface Avatar {
		id?: string;
		name?: string;
		description?: string;
		gender?: string;
		categories?: string[];
		fileName?: string;
		file?: string;
		screenshot?: string;
		createdAt?: string;
		updatedAt?: string;
		createdBy?: string;
	}

	let avatars: Avatar[] = [];
	let loading = true;
	let error: string | null = null;
	let selectedAvatar: Avatar | null = null;
	let showModal = false;

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

	async function handleSearch(query: string) {
		console.log('Search triggered with query:', query);
		avatars = await fetchAvatars(query);
		console.log('Avatars updated after search, length:', avatars.length);
	}

	function openAvatarModal(avatar: Avatar) {
		selectedAvatar = avatar;
		showModal = true;
	}

	function closeAvatarModal() {
		showModal = false;
		selectedAvatar = null;
	}

	// Handle Escape key to close modal
	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape' && showModal) {
			closeAvatarModal();
		}
	}

	onMount(async () => {
		console.log('Component mounted, fetching initial avatars...');
		avatars = await fetchAvatars();
		console.log('Initial avatars loaded, length:', avatars.length);
	});
</script>

<svelte:window on:keydown={handleKeydown} />

<SearchPage
	title="Avatars"
	description="Browse and search for avatars."
	onSearch={handleSearch}
>
	<div class="result-grid">
		{#if loading}
			<div class="loading">Loading avatars...</div>
		{:else if error}
			<div class="error">Error: {error}</div>
		{:else if avatars.length === 0}
			<div class="no-results">No avatars found.</div>
		{:else}
			{#each avatars as avatar}
				<div 
					class="result-card" 
					on:click={() => openAvatarModal(avatar)} 
					on:keydown={(e) => e.key === 'Enter' && openAvatarModal(avatar)} 
					tabindex="0" 
					role="button"
				>
					<h3>{avatar.name || 'Unnamed Avatar'}</h3>
					<p>{avatar.description || 'No description available.'}</p>
					{#if avatar.gender}
						<span class="tag">{avatar.gender}</span>
					{/if}
					{#if avatar.categories && avatar.categories.length > 0}
						<div class="categories">
							{#each avatar.categories as category}
								<span class="tag">{category}</span>
							{/each}
						</div>
					{/if}
				</div>
			{/each}
		{/if}
	</div>
</SearchPage>

{#if showModal && selectedAvatar}
	<AvatarDetailModal avatar={selectedAvatar} on:close={closeAvatarModal} />
{/if}

<style>
	.result-card {
		cursor: pointer;
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.result-card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.result-card:focus {
		outline: 2px solid var(--color-primary);
		outline-offset: 2px;
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