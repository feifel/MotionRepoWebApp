<script lang="ts">
	import { apiService, MOCK_CONFIG } from '$lib/api/mockApiService.js';
	import { onMount } from 'svelte';

	let isUsingMock = false;
	let showDetails = false;

	onMount(async () => {
		isUsingMock = apiService.isUsingMockData();
	});

	async function refreshConnection() {
		const apiAvailable = await apiService.refreshApiStatus();
		isUsingMock = !apiAvailable;
		showDetails = false;
	}
</script>

{#if isUsingMock && MOCK_CONFIG.showMockWarning}
	<div class="mock-indicator">
		<div class="mock-banner" on:click={() => showDetails = !showDetails}>
			<span class="warning-icon">⚠️</span>
			<span>Using Sample Data</span>
			<button class="refresh-btn" on:click|stopPropagation={refreshConnection} title="Retry connection">
				🔄
			</button>
		</div>
		
		{#if showDetails}
			<div class="mock-details">
				<p>The real API server is not available. You're viewing sample data for demonstration purposes.</p>
				<p>Features available with sample data:</p>
				<ul>
					<li>3 sample workouts</li>
					<li>4 sample motions/exercises</li>
					<li>4 sample avatars</li>
					<li>Search functionality</li>
					<li>Detailed views for all items</li>
				</ul>
			</div>
		{/if}
	</div>
{/if}

<style>
	.mock-indicator {
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 1000;
		max-width: 300px;
	}

	.mock-banner {
		background: #fff3cd;
		border: 1px solid #ffeaa7;
		border-radius: 8px;
		padding: 8px 12px;
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 14px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		transition: all 0.2s ease;
	}

	.mock-banner:hover {
		background: #fff3cd;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
	}

	.warning-icon {
		font-size: 16px;
	}

	.refresh-btn {
		background: none;
		border: none;
		cursor: pointer;
		font-size: 14px;
		padding: 2px;
		border-radius: 3px;
		transition: background-color 0.2s;
	}

	.refresh-btn:hover {
		background-color: rgba(0, 0, 0, 0.1);
	}

	.mock-details {
		background: white;
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 12px;
		margin-top: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		font-size: 13px;
		line-height: 1.4;
	}

	.mock-details ul {
		margin: 8px 0;
		padding-left: 20px;
	}

	.mock-details li {
		margin: 2px 0;
	}

	.mock-details p {
		margin: 8px 0;
	}
</style>