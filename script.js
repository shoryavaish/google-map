function toggleList(){
    document.getElementById('hamburger').classList.toggle('active');
    document.getElementById('dropdown').classList.toggle('active');
}

function toggleTheme(){
    const theme = document.getElementById("theme").value;
    if(theme === 'light')
        document.body.classList.remove('dark')
    else
        document.body.classList.remove('light')
    document.body.classList.add(theme)
}

var imageBaseUrl = 'http://maps.google.com/mapfiles/kml/paddle/';
var icons = ['orange-blank.png', 'blu-blank.png'];

var neighborhoods = {
    1: [
        {name: 'Location 1', lat: 52.511, lng: 13.447},
        {name: 'Location 2', lat: 52.549, lng: 13.422},
        {name: 'Location 3', lat: 52.497, lng: 13.396},
        {name: 'Location 4', lat: 52.517, lng: 13.394}
    ],
    2: [
        {name: 'Location 1', lat: 52.521, lng: 13.447},
        {name: 'Location 2', lat: 52.499, lng: 13.422},
        {name: 'Location 3', lat: 52.550, lng: 13.396},
        {name: 'Location 4', lat: 52.490, lng: 13.394}
    ]
}

var markers = [];
var markersPosition = {};
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 52.520, lng: 13.410}
    });
}

function drop(region, marker, ev) {
    if(ev.checked){
        if(!markersPosition[region])
            markersPosition[region] = []
        markersPosition[region][marker] = markers.length;
        addMarkerWithTimeout(neighborhoods[region][marker], region)
    }else
        clearMarker(region, marker)
}

function addMarkerWithTimeout(position, region) {
    markers.push(new google.maps.Marker({
        position: {lat:position.lat, lng: position.lng},
        map: map,
        animation: google.maps.Animation.DROP,
        label: region.toString(),
        icon: {
            url: imageBaseUrl + icons[region-1],
            scaledSize: new google.maps.Size(64, 64)
        },
        title: position.name
    }));
}

function clearMarker(region, marker) {
    const markerIndex = markersPosition[region][marker]
    markers[markerIndex].setMap(null)
    delete markersPosition[region][marker]
}
