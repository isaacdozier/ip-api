const b = "<br/>"

var lat, lng

var request = new XMLHttpRequest();

request.open('GET', 'https://api.ipdata.co/?api-key=test');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
  	var data = JSON.parse(this.responseText);

    document.getElementById('ip').innerHTML = "<b>IP Address:</b>" + b
    										+ data.ip + b
    										+ b
    										+ "<b>Physical Location:</b>" + b
    										+ data.city +", "+ data.region_code + b
    										+ data.continent_name + b
    										+ b
    										+ "<b>GPS Coordinates:</b>" + b
    										+ data.latitude +", "+ data.longitude + b
    										+ b
    										+ "<b>ISP Provider:</b>" + b
    										+ data.asn.name + b
    										+ b
    										+ "<b>Timezone:</b>" + b
    										+ data.time_zone.abbr + " - " + data.time_zone.name + b
    										+ data.time_zone.current_time + b
    										+ b;

    lat = Number(data.latitude)
    lng = Number(data.longitude)

    initMap()
  }
};

request.send();

var map;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: lat, lng: lng},
  zoom: 8
});
}