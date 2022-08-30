let tiles = document.getElementById("create-tiles");
tiles.addEventListener('click', createTiles);


let sizeChange = document.getElementById("sizing");
sizeChange.addEventListener('keypress' , event => {
    if ((event.key =="Enter") && (event.target.value < 0 || event.target.value > 100)) {
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
    if (enableColorChange == true) {
        
        event.target.style.background = "#AD5EA7";
        if (randomColors)
            event.target.style.background = "#" + Math.floor(Math.random()*16777215).toString(16);
        else if (darkerColor) {
            event.target.style.filter = "grayscale(10%)"
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
    // if (randomColors) {
    //     randomColors = false;
    // } else {
    //     randomColors = true;
    // }
    console.log(randomColors);
})

let darkerButton = document.getElementById("dark");
darkerButton.addEventListener('click', event => {
    darkerColor = !darkerColor;
})