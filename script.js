let tiles = document.getElementById("create-tiles");
tiles.addEventListener('click', createTiles);

let enableColorChange = false;

function createTiles() {
    let size = 16;
    let container = document.getElementById('tiles-box');

    container.style.setProperty('--grid-rows', size);
    container.style.setProperty('--grid-cols', size);
    for (let i = 0; i < size*size; i++) {

        let tile = document.createElement("div");
        tile.setAttribute("id", "tile");
        // tile.setAttribute("width", tileSize);
        // tile.setAttribute("height", tileSize);
        tile.addEventListener('click', enableColor);
        tile.addEventListener('mouseover', changeColor);
        container.appendChild(tile).className = "tile";
    }
}

function changeColor(event) {
    if (enableColorChange == true)
        event.target.style.background = "#AD5EA7";
}

function enableColor(event) {
    if (enableColorChange == false) {
        enableColorChange = true;
    } else {
        enableColorChange = false;
    }
}