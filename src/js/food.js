let map;
const localContent = document.querySelector('.card-columns');
const searchData = document.getElementById('searchData');
const cardRow = document.getElementById('card-row')

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
};

const callback = (results, status) => {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (let i = 0; i < results.length; i++) {
      madeMarker(results[i]);
    }
  }

  const filterFood = (results, search) => {
    return results.filter((option) => {
      return option.name.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }

  searchData.addEventListener('keyup', () => {
    const data = searchData.value;
    let result2 = filterFood(results, data);
    cardRow.innerHTML = ''
    result2.forEach(element => {
      createCardRow(element);
    })
  })
}


/*const madeMarker = (place) => {
  console.log(place);
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

}*/
const madeMarker = (place) => {
    let marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
    });
    createCardRow(place);
    google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(place.name);
        infoWindow.open(map, marker);
    });
}

const createCardRow = (place) => {
    let photos = place.photos;
    if (!photos) {
        return;
    }
    cardRow.innerHTML +=
    `<div class="col s6 m4 l3 card">
        <div class="card-image">
          <img class="activator responsive-img" src="${photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 250 })}">
        </div>
        <div class="card-content">
          <span class="card-title">${place.name}</span>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">${place.name}<i class="material-icons right">close</i></span>
          <p>Rating: ${place.rating} puntos</p>
          <p>Dirección: ${place.vicinity} </p>
          <p>Dirección: ${place.locationUser} </p>
          <div style="width: 100px; height: 100px;" id="map_canvas${place.id}"></div>
         </div>
      </div>`
    };
localUser();
