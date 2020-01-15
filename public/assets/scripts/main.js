let matrixDisplay = document.getElementById('matrix-display');
console.log('matrixDisplay', matrixDisplay);
let pixels = document.getElementsByClassName('pixel');
let svg = document.getElementById('matrix-display');
let terminalId = 0;

for(let p of pixels){
  p.attributes.fill.value = '#666';
}

function startRolling(terminalId, textContent = 'Hello Guys'){
  console.log('terminalId', terminalId);
  let myInt = setTimeout(() => {
      moveText(textContent.toUpperCase());
      clearInterval(myInt);
  }, terminalId * 1500);
}


const socket = io.connect('');
socket.on('connect', function(){
  console.log('connected');
});

socket.on('LIGHT', function(data){
  console.log('LIGHT request');
  // document.body.style.background = data.color;
  startRolling(terminalId, data.textContent);
});

socket.on('SOUND', function(data){
  console.log('SOUND request');
  var audio = new Audio(`/public/assets/sounds/${data.audio}.mp3`);
  audio.play();
});

socket.on('NEW_USER THISROOM', function(data){
  console.log('NEW_USER request', data);
  document.getElementById('user-count').innerHTML = data.count;
});

socket.on('TERMINAL_ID', function(data){
  console.log('TERMINAL_ID request', data);
  terminalId = data.terminalId;
});


let btnLight = document.getElementById('btn-light');
let btnSound = document.getElementById('btn-sound');

btnLight.onclick = () => {
  let currentColor = document.body.style.background.split(' ')[0];
  if(currentColor == "black"){
    socket.emit('LIGHT', { 'color': 'white' });
  }
  else {
    socket.emit('LIGHT', { 'color': 'black' });
  }
}

btnSound.onclick = () => {
  socket.emit('SOUND', { 'audio': 'loud-clapping' });
}