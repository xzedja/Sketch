let tiles = document.getElementById("create-tiles");
tiles.addEventListener('click', createTiles);

let enableColorChange = false;

function createTiles() {
    let size = 16;
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

function deleteTiles(container) {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}