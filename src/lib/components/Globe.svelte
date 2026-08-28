<script lang="ts">
  import { getCesiumToken } from "./token.remote.js";
  import type { Viewer } from "cesium";

  let viewer: Viewer | null = null;

  function initCesium(node: HTMLDivElement) {
    let isDestroyed = false;
    let activeViewer: Viewer | null = null;

    // Create an internal async execution wrapper
    async function setup() {
      // 1. Fetch token and import the library concurrently
      const [token, Cesium] = await Promise.all([getCesiumToken(), import("cesium")]);

      // Stop execution if the user navigated away while downloading files
      if (isDestroyed) return;

      Cesium.Ion.defaultAccessToken = token;

      // 2. Initialize the viewer directly on the DOM element node
      activeViewer = new Cesium.Viewer(node, {
        terrain: Cesium.Terrain.fromWorldTerrain()
      });
      viewer = activeViewer;
      // Fly the camera to San Francisco at the given longitude, latitude, and height.
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
        orientation: {
          heading: Cesium.Math.toRadians(0.0),
          pitch: Cesium.Math.toRadians(-15.0)
        }
      });

      // Add Cesium OSM Buildings, a global 3D buildings layer.
      const buildingTileset = await Cesium.createOsmBuildingsAsync();
      viewer.scene.primitives.add(buildingTileset);

      if (!isDestroyed) {
        activeViewer.scene.primitives.add(buildingTileset);
      } else {
        activeViewer.destroy();
      }
    }

    // Fire off the asynchronous setup process
    setup();

    // 4. Return the mandatory lifecycle teardown hook
    return {
      destroy() {
        isDestroyed = true;
        if (activeViewer && !activeViewer.isDestroyed()) {
          activeViewer.destroy();
          viewer = null;
        }
      }
    };
  }
</script>

<!-- The action triggers automatically when this node enters the DOM -->
<div use:initCesium class="h-full w-full bg-black"></div>
