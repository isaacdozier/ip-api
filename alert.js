var noSleep = new NoSleep();

function enableNoSleep() {
  noSleep.enable();
  document.removeEventListener('click', enableNoSleep, false);
}

function arm(){
    document.getElementById('alert').innerHTML = '<button class="button btn btn-danger btn-lg" type="submit" onclick="disarm()" value="arm">Armed</button>'
    document.getElementById('loadButton').innerHTML = '<i class="fa fa-spinner fa-spin"></i>'
    document.addEventListener('click', enableNoSleep, false);

}

function disarm(){
    document.getElementById('alert').innerHTML = '<button class="button btn btn-warning btn-lg" type="submit" onclick="arm()" value="arm">Enable</button>'
    document.getElementById('loadButton').innerHTML = ''
    noSleep.disable();
}
