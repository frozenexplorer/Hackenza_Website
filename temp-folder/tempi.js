const fs = require('fs');

// Read the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync('mapp.geojson', 'utf8'));

// Function to filter road features
function filterRoads(feature) {
    // Check if the feature represents a road (LineString or MultiLineString)
    return (
        feature.geometry &&
        (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') &&
        feature.properties && 
        feature.properties.highway
    );
}

// Filter road features
const roads = geojsonData.features.filter(filterRoads);

// Create a new GeoJSON object containing only road features
const roadsGeoJSON = {
    type: 'FeatureCollection',
    features: roads
};
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Assign a random number between 1 to 10 to a new property for each road feature
geojsonData.features.forEach(feature => {
    // Generate random number
    const randomNumber = getRandomInt(1, 10);
    
    // Assign the random number to a new property
    feature.properties.randomNumber = randomNumber;
});

// Write the filtered GeoJSON data to a file
fs.writeFileSync('roads.geojson', JSON.stringify(roadsGeoJSON), 'utf8');

console.log('Roads identified and saved to roads.geojson file.');