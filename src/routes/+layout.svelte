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
		min-height: 100vh;
	}
	main {
		flex: 1;
		padding-bottom: 80px;
		box-sizing: border-box;
	}
</style>
