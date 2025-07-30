<script lang="ts">
	import { apiService, getImageUrl } from '$lib';
	import MockDataIndicator from '$lib/components/MockDataIndicator.svelte';
	import { onMount } from 'svelte';

	let workouts: any[] = [];
	let motions: any[] = [];
	let avatars: any[] = [];
	let loading = true;
	let error: string | null = null;

	onMount(async () => {
		try {
			loading = true;
			
			// Fetch all types of data
			const [workoutsRes, motionsRes, avatarsRes] = await Promise.all([
				apiService.getWorkouts(1, 3),
				apiService.getMotions(1, 4),
				apiService.getAvatars(1, 4)
			]);

			workouts = workoutsRes.data || [];
			motions = motionsRes.data || [];
			avatars = avatarsRes.data || [];
		} catch (err) {
			error = err instanceof Error ? err.message : 'Failed to load data';
		} finally {
			loading = false;
		}
	});
</script>

<svelte:head>
	<title>Demo - MotionRepo WebApp</title>
</svelte:head>

<MockDataIndicator />

<div class="demo-container">
	<h1>MotionRepo WebApp Demo</h1>
	
	{#if loading}
		<div class="loading">
			<div class="spinner"></div>
			<p>Loading sample data...</p>
		</div>
	{:else if error}
		<div class="error">
			<h2>Error Loading Data</h2>
			<p>{error}</p>
		</div>
	{:else}
		<div class="data-grid">
			<section>
				<h2>Sample Workouts ({workouts.length})</h2>
				<div class="cards">
					{#each workouts as workout}
						<div class="card">
							<img 
								src={getImageUrl(workout.screenshot, 'workout', workout.id)} 
								alt={workout.name}
							/>
							<h3>{workout.name}</h3>
							<p class="description">{workout.description}</p>
							<div class="tags">
								<span class="tag">{workout.difficulty}</span>
								<span class="tag">{workout.duration} min</span>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section>
				<h2>Sample Motions ({motions.length})</h2>
				<div class="cards">
					{#each motions as motion}
						<div class="card">
							<img 
								src={getImageUrl(motion.screenshot, 'motion', motion.id)} 
								alt={motion.name}
							/>
							<h3>{motion.name}</h3>
							<p class="description">{motion.description}</p>
							<div class="tags">
								<span class="tag">Level {motion.level}</span>
								<span class="tag">{motion.duration}s</span>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section>
				<h2>Sample Avatars ({avatars.length})</h2>
				<div class="cards">
					{#each avatars as avatar}
						<div class="card">
							<img 
								src={getImageUrl(avatar.screenshot, 'avatar', avatar.id)} 
								alt={avatar.name}
							/>
							<h3>{avatar.name}</h3>
							<p class="description">{avatar.description}</p>
							<div class="tags">
								<span class="tag">{avatar.gender}</span>
								<span class="tag">{avatar.categories?.[0]}</span>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>

<style>
	.demo-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
	}

	h1 {
		text-align: center;
		margin-bottom: 2rem;
		color: #333;
	}

	.loading {
		text-align: center;
		padding: 3rem;
	}

	.spinner {
		border: 4px solid #f3f3f3;
		border-top: 4px solid #3498db;
		border-radius: 50%;
		width: 40px;
		height: 40px;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error {
		text-align: center;
		padding: 3rem;
		color: #e74c3c;
	}

	.data-grid {
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	section h2 {
		margin-bottom: 1rem;
		color: #2c3e50;
		border-bottom: 2px solid #3498db;
		padding-bottom: 0.5rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
	}

	.card {
		border: 1px solid #ddd;
		border-radius: 8px;
		padding: 1rem;
		background: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s;
	}

	.card:hover {
		transform: translateY(-2px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
	}

	.card img {
		width: 100%;
		height: 200px;
		object-fit: cover;
		border-radius: 4px;
		margin-bottom: 1rem;
	}

	.card h3 {
		margin: 0 0 0.5rem 0;
		color: #2c3e50;
	}

	.description {
		color: #666;
		font-size: 0.9rem;
		line-height: 1.4;
		margin-bottom: 1rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.tags {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.tag {
		background: #3498db;
		color: white;
		padding: 0.25rem 0.5rem;
		border-radius: 12px;
		font-size: 0.8rem;
	}

	@media (max-width: 768px) {
		.demo-container {
			padding: 1rem;
		}
		
		.cards {
			grid-template-columns: 1fr;
		}
	}
</style>