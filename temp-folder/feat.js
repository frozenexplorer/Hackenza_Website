const fs = require('fs');

// Read the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync('mapp.geojson', 'utf8'));

// Function to generate a random number between min (inclusive) and max (inclusive)
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

// Write the updated GeoJSON data to a file
fs.writeFileSync('updated_geojson_file.geojson', JSON.stringify(geojsonData), 'utf8');

console.log('Random numbers assigned to road features and saved to updated_geojson_file.geojson file.');