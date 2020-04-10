const b = "<br/>"

var request = new XMLHttpRequest();

request.open('GET', 'https://api.ipdata.co/?api-key=test');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
  	var data = JSON.parse(this.responseText);

    document.getElementById('ip').innerHTML = data.ip + b
    										+ b
    										+ data.city +", "+ data.region_code + b
    										+ data.continent_name + b
    										+ b
    										+ data.latitude +", "+ data.longitude + b
    										+ b
    										+ data.asn.name + b
    										+ b
    										+ data.time_zone.abbr + " - " + data.time_zone.name + b
    										+ data.time_zone.current_time + b
    										+ b;

    console.log(data)

  }
};

request.send();