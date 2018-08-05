// Initialize and add the map
function initMap() {
  // The location of Uluru
  let mex = {lat: 19.364456, lng: -99.187620};
  // The map, centered at Uluru
  let map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: mex});
  // The marker, positioned at Uluru
  let marker = new google.maps.Marker({position: mex, map: map});
}
