<script>
	import { onDestroy } from 'svelte';

	// Define props using Svelte 5 runes
	let { token = 'YOUR_CESIUM_ION_ACCESS_TOKEN' } = $props();

	let container = $state(null);
	let viewer = null;

	// Use $effect to initialize when the DOM node is ready
	$effect(() => {
		if (!container) return;

		// 1. Tell Cesium where the copied static assets live on your server
		window.CESIUM_BASE_URL = '/cesium/';

		// 2. Import Cesium dynamically to prevent SSR (Server-Side Rendering) failures
		import('cesium').then(async (Cesium) => {
			// Set access token
			Cesium.Ion.defaultAccessToken = token;

			// Initialize the viewer container
			viewer = new Cesium.Viewer(container, {
				terrain: Cesium.Terrain.fromWorldTerrain()
			});

			// Fly camera to San Francisco (as seen in quickstart docs)
			viewer.camera.flyTo({
				destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
				orientation: {
					heading: Cesium.Math.toRadians(0.0),
					pitch: Cesium.Math.toRadians(-15.0)
				}
			});

			// Add global 3D buildings layer
			const buildingTileset = await Cesium.createOsmBuildingsAsync();
			viewer.scene.primitives.add(buildingTileset);
		});
	});

	// Safely destroy viewer instance when component unmounts
	onDestroy(() => {
		if (viewer && !viewer.isDestroyed()) {
			viewer.destroy();
		}
	});
</script>

<!-- Import the base Cesium widget CSS styling sheet -->
<link rel="stylesheet" href="/cesium/Widgets/widgets.css" />

<!-- Bind the HTML element to our state variable -->
<div bind:this={container} class="h-full w-full bg-black"></div>
