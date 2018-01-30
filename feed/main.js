var constraints = {
    audio: false,
    video: { width: window.screen.width, height: window.screen.height }
};



navigator.mediaDevices.getUserMedia(constraints)
    .then(success)
    .catch(error);

function success(stream) {
    var video = document.getElementById('video');
    video.srcObject = stream;
    document.addEventListener('click', enableNoSleep, false);
}

function error(error) {
    console.log(error);
}

var noSleep = new NoSleep();

function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('click', enableNoSleep, false);
}

function disarm(){
    window.location.replace("../index.html");
}