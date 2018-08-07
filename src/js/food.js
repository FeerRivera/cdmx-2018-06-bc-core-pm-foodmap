let map;

const localUser = () => {
if (navigator.geolocation) {

} else {
  console.log('');
}

const location = (position) => {
  let latitud = position.coords.latitude;
  let longitud = position.coords.longitude;
  initMap(latitud, longitud);

}
navigator.geolocation.getCurrentPosition(location, ()=> {
  console.log('Error al obtener localizacion')
});
};

const initMap =(latitud, longitud) => {
  let center = new google.maps.LatLng(latitud,longitud);
  map = new google.maps.Map(document.getElementById('map'), {
    center: center,
    zoom: 16
  });
  let request = {
    location: center,
    radius: 500,
    types: ['bar']

  };
  let service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);
}

function callBack(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      crearMarcador(results[i]);
    }
  }

  const filterFood = (results, search) => {
    return results.filter((option) => {
      return option.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }

  searchData.addEventListener('keyup', () => {
    const data = searchData.value;
    let resultado2 = filterFood(results, data);
    cardContent.innerHTML = ''
    resultado2.forEach(element => {
      createCard(element);
    })
  })
}

function crearMarcador(place) {

  var newMarkers = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  // console.log(place);
  createCard(place);
  // Evento click para el marcador
  google.maps.event.addListener(newMarkers, 'click', function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });

}


function inicializar (place){

  var mapOptions = {
    center: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
    zoom: 50
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"+place.id), mapOptions);

  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });


}

const createCard = (place) => {
  var photos = place.photos;
  // const nameType = Object.values(place.types);
  // const title = nameType['restaurant'];
  // console.log(title);
  if (!photos) {
    return;
  }

  cardContent.innerHTML +=
  `<div class="card">
    <div class="card-body">
    <!-- Button trigger modal -->
    <img class="card-img-top" src="${photos[0].getUrl({ 'maxWidth': 350, 'maxHeight': 350 })}" alt="Card image cap" data-toggle="modal" data-target="#exampleModalCenter${place.id}">
    </div>
    <!-- Modal -->
  <div class="modal fade" id="exampleModalCenter${place.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="card-title">${place.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div style="width: 300px; height: 200px;" id="map_canvas${place.id}"></div>
          <p class="card-text">Puntuación: ${place.rating}</p>
          <p class="card-text">Dirección: ${place.vicinity}</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">OK</button>
        </div>
      </div>
    </div>
  </div>
`
inicializar(place);
}

$('#myModal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');

})

localUser();
