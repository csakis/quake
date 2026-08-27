import { query } from '$app/server'; // 👈 Fix: Import from $app/server
import { CESIUM_TOKEN } from '$app/env/private';

export const fetchGeospatialData = query(async (datasetId = '12345') => {
	const response = await fetch(`https://cesium.com{datasetId}`, {
		headers: {
			Authorization: `Bearer ${CESIUM_TOKEN}`
		}
	});

	if (!response.ok) {
		throw new Error('Failed to securely fetch asset metadata from Cesium');
	}

	return await response.json();
});