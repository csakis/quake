<script>
	import { onDestroy } from 'svelte';
	import { getCesiumToken } from './token.remote.js';

	let container = $state(null);
	let viewer = null;

	$effect(() => {
		if (!container) return;

		window.CESIUM_BASE_URL = '/cesium/';

		// The server returns a string, but the browser must wait for the network packet
		getCesiumToken().then((token) => {
			import('cesium').then(async (Cesium) => {
				Cesium.Ion.defaultAccessToken = token;

				viewer = new Cesium.Viewer(container, {
					terrain: Cesium.Terrain.fromWorldTerrain()
				});

				const buildingTileset = await Cesium.createOsmBuildingsAsync();
				viewer.scene.primitives.add(buildingTileset);
			});
		});
	});

	onDestroy(() => {
		if (viewer && !viewer.isDestroyed()) {
			viewer.destroy();
		}
	});
</script>

<link rel="stylesheet" href="/cesium/Widgets/widgets.css" />
<div bind:this={container} class="h-full w-full bg-black"></div>
