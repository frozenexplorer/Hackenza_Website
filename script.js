L.geoJSON(RoadData).addTo(map);
L.geoJSON(RoadData, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(feature.properties.name);
  },
}).addTo(map);
map.on("mousemove", function (e) {
  document.querySelector(".coordinate").innerText =
    "lat: " + e.latlng.lat + ", lng: " + e.latlng.lng;
  console.log("lat: " + e.latlng.lat, "lng: " + e.latlng.lng);
});
