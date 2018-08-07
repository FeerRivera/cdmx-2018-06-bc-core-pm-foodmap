let map;
const localContent = document.querySelector('.card-columns');
const searchData = document.getElementById('searchData');

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
    cardContent.innerHTML = ''
    result2.forEach(element => {
      createCard(element);
    })
  })
}


const madeMarker = (place) => {
  console.log(place);
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });

}



localUser();
