<script>
	import BottomNav from '$lib/components/BottomNav.svelte';
</script>

<div class="layout">
	<main>
		<slot />
	</main>

	<BottomNav />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
		overflow: hidden;
	}
	main {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		box-sizing: border-box;
	}
</style>
