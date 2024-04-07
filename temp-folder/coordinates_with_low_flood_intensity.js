// Assuming you have a Leaflet map initialized and stored in the variable 'map'

function createMarkers(coordinates) {
    coordinates.forEach(coord => {
        L.marker(coord).addTo(map);
    });
}

// Coordinates array
const safeC = [
    [28.6816945, 77.1986524],
    [28.6814735, 77.1981395],
    [28.6764341, 77.2023946],
    [28.686222, 77.1856126],
    [28.6897037, 77.1850814],
    [28.6822624, 77.1874133],
    [28.6816909, 77.1851928],
    [28.693249, 77.18395],
    [28.6843487, 77.1877137],
    [28.6832093, 77.1867425]
];

// Create markers
createMarkers(safeC);
