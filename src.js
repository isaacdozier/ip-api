var request = new XMLHttpRequest();

request.open('GET', 'https://api.ipdata.co/?api-key=test');

request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    document.getElementById('ip-info').innerHTML = this.responseText;
    console.log(this.responseText)
  }
};

request.send();