import tailwindcss from '@tailwindcss/vite';
import adapter from '@sveltejs/adapter-auto';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
				experimental: { async: true }
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter(),
			experimental: { remoteFunctions: true }
		}),
		viteStaticCopy({
			targets: [
				{ src: 'node_modules/cesium/Build/Cesium/Workers', dest: 'cesium' },
				{ src: 'node_modules/cesium/Build/Cesium/Assets', dest: 'cesium' },
				{ src: 'node_modules/cesium/Build/Cesium/ThirdParty', dest: 'cesium' },
				{ src: 'node_modules/cesium/Build/Cesium/Widgets', dest: 'cesium' }
			]
		})
	]
});
