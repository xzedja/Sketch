let tiles = document.getElementById("create-tiles");
tiles.addEventListener('click', createTiles);


let sizeChange = document.getElementById("sizing");
sizeChange.addEventListener('keypress' , event => {
    if ( (event.target.value.match(/^[a-zA-Z]+$/)) || (event.key =="Enter") && (event.target.value < 0 || event.target.value > 100)) {
        alert("Value must be between 1 and 100");
        event.target.value = 0;
    } else {
        size = event.target.value;
    }
    console.log(size);
});

let enableColorChange = false;
let randomColors = false;
let darkerColor = false;
let size = 16;

function createTiles() {
    let container = document.getElementById('tiles-box');
    deleteTiles(container);

    container.style.setProperty('--grid-rows', size);
    container.style.setProperty('--grid-cols', size);

    for (let i = 0; i < size*size; i++) {

        let tile = document.createElement("div");
        tile.setAttribute("id", "tile");
        tile.addEventListener('mouseover', changeColor);
        tile.addEventListener('click', enableColor);
        container.appendChild(tile).className = "tile";
    }
}

function changeColor(event) {
    currentColor = event.target.style.background;
    if (enableColorChange == true) {
        
        event.target.style.background = "#AD5EA7";
        if (randomColors)
            event.target.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
        else if (darkerColor) {
            event.target.style.background = darkenColor(currentColor);
            console.log(event.target.style.background);
        }
    } 
}

function enableColor(event) {
    if (enableColorChange == false) {
        enableColorChange = true;
    } else {
        enableColorChange = false;
    }
}

function deleteTiles(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}

let randomButton = document.getElementById("random");
randomButton.addEventListener('click', event => {
    randomColors = !randomColors;
    console.log(randomColors);
})

let darkerButton = document.getElementById("dark");
darkerButton.addEventListener('click', event => {
    darkerColor = !darkerColor;
    console.log(darkerColor);
})

function darkenColor(rgb) {
    let rgbArray = rgb.replace(/ /g, '').slice(4, -1).split(',').map(e => parseInt(e));
    console.log(rgbArray)
    let [lowest,middle,highest]=getLowestMiddleHighest(rgbArray);
    if(highest.val===0){
        return rgb;
      }
    
      
      let returnArray = [];
      returnArray[highest.index] = highest.val-(Math.min(highest.val,25.5));
       let decreaseFraction  =(highest.val-returnArray[highest.index])/ (highest.val);
      returnArray[middle.index]= middle.val -middle.val*decreaseFraction; 
      returnArray[lowest.index]= lowest.val -lowest.val*decreaseFraction;                                       
      
      // Convert the array back into an rgb string
      return (`rgb(${returnArray.join()}) `);
}

function getLowestMiddleHighest(rgbIntArray) {
    let highest = {val:-1,index:-1};
    let lowest = {val:Infinity,index:-1};
  
    rgbIntArray.map((val,index)=>{
      if(val>highest.val){
        highest = {val:val,index:index};
      }
      if(val<lowest.val){
         lowest = {val:val,index:index};
      }
    });
    if(lowest.index===highest.index){
      lowest.index=highest.index+1;
    }
    let middle = {index: (3 - highest.index - lowest.index)};
    middle.val = rgbIntArray[middle.index];
    console.log([lowest,middle,highest]);
    return [lowest,middle,highest];
  }