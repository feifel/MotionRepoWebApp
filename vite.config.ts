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
            base: '/MotionRepoWebApp/',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
                // IMPORTANT: prefix every generated URL with the repo base
                modifyURLPrefix: {
                    '': '/MotionRepoWebApp/'
                }
            },
            manifest: {
                name: 'Free WebXR Workout App',
                short_name: 'XR Workout',
                description: 'A free progressive WebXR Workout app that can be extended by custom exercises.',
                theme_color: '#ffffff',
                background_color: '#ffffff',
                display: 'standalone',
                scope: '/MotionRepoWebApp/',
                start_url: '/MotionRepoWebApp/',
                icons: [
                    {
                        src: '/pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    },
                    {
                        src: '/pwa-512x512.png',
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