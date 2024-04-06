const fs = require('fs');

// Read the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync('mapp.geojson', 'utf8'));

// Function to filter road features
function filterRoads(feature) {
    // Check if the feature represents a road
    return feature.properties && feature.properties.highway;
}

// Filter road features
const roads = geojsonData.features.filter(filterRoads);

// Write the filtered GeoJSON data to a file
fs.writeFileSync('roads.geojson', JSON.stringify({ type: 'FeatureCollection', features: roads }), 'utf8');

console.log('Roads identified and saved to roads.geojson file.');