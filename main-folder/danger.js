const fs = require('fs');

// Read the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync('AllRoads.geojson', 'utf8'));

// Initialize an array to store the coordinates
const coordinatesWithLowFloodIntensity = [];

// Initialize a counter to track the number of coordinates added
let count = 0;

// Iterate over the road features
geojsonData.features.forEach(feature => {
    if (count < 30 && feature.properties && feature.properties.flood_intensity && feature.properties.flood_intensity > 9) {
        // Extract the first coordinate of the road
        const coordinates = feature.geometry.coordinates;
        if (coordinates.length > 0) {
            const firstCoordinate = coordinates[0];
            // Swap x and y coordinates
            const swappedCoordinate = [firstCoordinate[1], firstCoordinate[0]];
            // Push the swapped coordinate to the array
            coordinatesWithLowFloodIntensity.push(swappedCoordinate);
            // Increment the counter
            count++;
        }
    }
    // Exit the loop if count reaches 10 as we are checking best 10 safe nodes possible
    if (count >= 30) {
        return;
    }
});

// Save the array of coordinates to a file or use it as needed
fs.writeFileSync('coordinates_with_high_flood_intensity.json', JSON.stringify(coordinatesWithLowFloodIntensity), 'utf8');