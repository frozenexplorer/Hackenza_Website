const fs = require("fs");
const csv = require("csv-parser");

// Read the GeoJSON file
const geojsonData = JSON.parse(fs.readFileSync("mapp.geojson", "utf8"));

// Function to filter road features
function filterRoads(feature) {
  // Check if the feature represents a road (LineString or MultiLineString)
  return (
    feature.geometry &&
    (feature.geometry.type === "LineString" ||
      feature.geometry.type === "MultiLineString") &&
    feature.properties &&
    feature.properties.highway
  );
}

// Read Flood_Intensity from Rainfall.csv and store it in an array
const floodIntensity = [];
fs.createReadStream("Rainfall.csv")
  .pipe(csv())
  .on("data", (row) => {
    // Assuming 'Flood_Intensity' is the column name in Rainfall.csv
    floodIntensity.push(row.Flood_Intensity);
  })
  .on("end", () => {
    // Filter road features
    const roads = geojsonData.features.filter(filterRoads);

    // Create a new GeoJSON object containing only road features
    const roadsGeoJSON = {
      type: "FeatureCollection",
      features: roads,
    };

    // Assign a random number between 1 to 10 to a new property for each road feature
    roadsGeoJSON.features.forEach((feature, index) => {
      // Check if the feature has a name property
      if (!feature.properties.name) {
        // If name property doesn't exist, set it to "unnamed road"
        feature.properties.name = "unnamed road";
      }

      // Assign flood intensity from the array sequentially
      feature.properties.flood_intensity =
        floodIntensity[index % floodIntensity.length];
    });

    // Write the filtered GeoJSON data to a file
    fs.writeFileSync("AllRoads.geojson", JSON.stringify(roadsGeoJSON), "utf8");

    console.log("Roads identified and saved to roads.geojson file.");
  });
