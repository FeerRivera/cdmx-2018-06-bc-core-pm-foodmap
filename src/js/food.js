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

      <button type="button" class="btn btn-success" data-toggle="modal" data-target="#${place.id}">
  Mas info
    </button>
  </div>
</div>
<!-- Modal -->
<div class="modal fade" id="${place.id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle"> ${place.name}</h5>

        <button type="button" class="close" data-dismiss="modal" aria-label="CERRAR">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">


      ${place.vicinity}
<p>Rating: ${place.rating} puntos</p>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">Cerrar</button>

      </div>
    </div>
  </div>
</div>`
    };
localUser();
