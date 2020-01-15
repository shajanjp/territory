
function boxToColumn(box){
  let cData = [[],[],[],[],[]]; 
  for(let i = 0; i < box.length; i++){
    cData[i%5].push(box[i]);
  }
  return cData;
}

function getColor(c){
  if(c == 0){
    return '#ebedf0' 
  }
  else {
    return '#196127'; 
  }

}

function clearSrc(){
  for (let p of document.getElementsByClassName('pixel')) {
    p.attributes.fill.value = '#ebedf0';
  }
}

function getPixelsFromString(text){
  text = `${' '.repeat(7)}${text}`
  let pixelStore = [];
  text.split('').forEach(c => {
    pixelStore = pixelStore.concat(boxToColumn(charMap[c]));
  })
  return pixelStore;
}

function PixelColumn(data, next){
  this.data = data;
  this.next = next;
}

function renderPixels(column){
  let pi = 0;
  while(pi < 105){
    column.data.forEach(p => {
    svg.getElementById(`p${pi+1}`).attributes.fill.value = getColor(p);
    pi++;
    })
    column = column.next;
  }
}

function renderColumn(column){
  setTimeout(() => {
    renderPixels(column);
    renderColumn(column.next);
  }, 100)
}

function moveText(text){
  text = text.toUpperCase();
  let pixelStore = getPixelsFromString(text); 
  let start = new PixelColumn([0,0,0,0,0,0,0], null);
  let prev = start;
  let next;
  
  pixelStore.forEach((c, i)=> {
    next = new PixelColumn(c, null);
    prev.next = next;
    prev = next;
    if((i+1)%5 == 0){

    next = new PixelColumn([0,0,0,0,0,0,0], null);
    prev.next = next;
    prev = next;
    }
  })
  
  prev.next = start;
  renderColumn(start);    

}



