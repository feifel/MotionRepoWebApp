<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';

	const navItems = [
		{ name: 'Workouts', icon: 'workout', path: resolve(`/workouts`) },
		{ name: 'Motions', icon: 'motions', path: resolve(`/motions`) },
		{ name: 'Avatars', icon: 'avatars', path: resolve(`/avatars`) },
		{ name: 'Profile', icon: 'profile', path: resolve(`/profile`) }
	];

	$: currentPath = $page.url.pathname;
</script>

<nav class="bottom-nav">
	{#each navItems as item}
		<a
			href={item.path}
			class="nav-item"
			class:active={currentPath === item.path ||
				(item.path !== resolve(`/`) && currentPath.startsWith(item.path))}
			aria-label={item.name}
		>
			<span class="nav-icon">
				{#if item.icon === 'workout'}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<rect x="2" y="9" width="4" height="6" rx="1" />
						<rect x="18" y="9" width="4" height="6" rx="1" />
						<rect x="8" y="11" width="8" height="2" rx="1" />
					</svg>
				{:else if item.icon === 'motions'}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<circle cx="12" cy="5" r="2" />
						<line x1="3" y1="9" x2="21" y2="9" />
						<polyline points="3,21 12,13 12,9" />
						<polyline points="12,13 21,21" />
					</svg>
				{:else if item.icon === 'avatars'}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
						<circle cx="9" cy="7" r="4" />
						<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
						<path d="M16 3.13a4 4 0 0 1 0 7.75" />
					</svg>
				{:else if item.icon === 'profile'}
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
						<circle cx="12" cy="7" r="4" />
					</svg>
				{/if}
			</span>
			<span class="nav-label">{item.name}</span>
		</a>
	{/each}
</nav>

<style>
    .bottom-nav {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: var(--color-bg-neutral);
        border-top: 1px solid var(--color-primary-shade1);
        padding: 8px 0;
        height: 64px;
        z-index: 1000;
        backdrop-filter: blur(10px);
    }

    .nav-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: var(--color-primary);
        padding: 4px 8px;
        border-radius: 8px;
        transition: all 0.2s ease;
        min-width: 60px;
        flex: 1;
        max-width: 100px;
    }

    .nav-item:hover {
        background-color: var(--color-bg-neutral);
    }

    .nav-item.active {
        color: var(--color-neutral-tint1);
        background-color: var(--color-bg-neutral-tint1);
    }

    .nav-icon {
        font-size: 24px;
        line-height: 1;
        margin-bottom: 2px;
    }

    .nav-label {
        font-size: 12px;
        font-weight: 500;
        line-height: 1.2;
    }

    /* Ensure the body has padding at the bottom to prevent content from being hidden by the nav */
    :global(body) {
        padding-bottom: 64px;
    }

    /* Responsive adjustments for smaller screens */
    @media (max-width: 480px) {
        .nav-label {
            font-size: 11px;
        }

        .nav-icon {
            font-size: 22px;
        }
    }
</style>