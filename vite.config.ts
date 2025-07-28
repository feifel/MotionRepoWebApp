import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        sveltekit(),
        VitePWA({
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            filename: 'sw.js',
            strategies: 'generateSW',
            base: '/MotionRepoWebApp/',   // <-- ADD THIS LINE
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
                modifyURLPrefix: { '': '/MotionRepoWebApp/' }
            },
            manifest: {
                name: 'Free WebXR Workout App',
                short_name: 'XR Workout',
                description: 'A free progressive WebXR Workout app that can be extended by custom exercises.',
                theme_color: '#ffff',
                background_color: '#ffff',
                display: 'standalone',
                scope: '/MotionRepoWebApp/',
                start_url: '/MotionRepoWebApp/',
                icons: [
                    {
                        src: '/MotionRepoWebApp/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/MotionRepoWebApp/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/MotionRepoWebApp/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            devOptions: {
                enabled: true,
                type: 'module',
            }
        })
    ]
});