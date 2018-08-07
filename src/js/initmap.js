const initMap =(latitud, longitud) => {
  let center = new google.maps.LatLng(latitud,longitud);
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 16
  });
map = new google.maps.Map(document.getElementById("contentMap"));

      // Creamos el infowindow
      infowindow = new google.maps.InfoWindow();

      // Se ingresa la latitud y longitud, un radio de distancia y el tipo
      var request = {
        location: textLatitudLongitud,
        radius: 700,
        types: ['bar']
      };

      let serviceRestaurant = new google.maps.places.PlacesService(map);

      serviceRestaurant.nearbySearch(request, callBack);

    };

  initMap();
