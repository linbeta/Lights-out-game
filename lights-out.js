"use strict";

const WIDTH = 7;
const HEIGHT = 5;
const DIFFICULTY = 5;  // pretty easy! the number of flips at settingBoard

// Toggle a single cell on <-> off

function toggleCell(y, x) {
    console.log("toggleCell", y, x);

    if (y < 0 || y >= HEIGHT || x < 0 || x >= WIDTH) {
        return;
    }

    // turn y, x => "y-2-x-3" (let id = `y-${y}-x-${x}`)
    let id = "y-" + y + "-x-" + x;

    // find cell w/that id: "#y-2-x-3" (glue "#" and id together)
    let cell = document.querySelector("#" + id);

    // toggle "on" class on cell
    cell.classList.toggle("on");
}

// handle player clicking on cell:
//
// - find out where they clicked
// - toggle that cell and its neighbors
// - if they won, pop up winning message

function handleCellClick(event) {
    console.log("handleCellClick");

    // get id from event.target.id
    let cell = event.target;
    let id = cell.id;

    // get y & x from it and turn them into numbers
    let y = Number(id[2]);
    let x = Number(id[6]);

    // call toggleCell with y, x
    toggleCellAndNeighbors(y, x);

    if (checkForWin()) {
        setTimeout(handleWin, 200); // 500ms = 1/2sec
    }
}

// Add "click listener" to each cell

function addClickListeners() {
    console.log("addClickListeners");

    // for (let cell of _____) 
    for (let cell of document.querySelectorAll("td")) {
        // add event listener to that cell
        cell.addEventListener("click", handleCellClick);
    }

}

// toggle this cell and top/left/right/bottom neighbors

function toggleCellAndNeighbors(y, x) {
    console.log("toggleCellAndNeighbors", y, x);

    // call toggleCell in cross shape
    toggleCell(y, x);
    toggleCell(y - 1, x);
    toggleCell(y + 1, x);
    toggleCell(y, x - 1);
    toggleCell(y, x + 1);
}

// Look at all cells to see if won -- returns true/false

function checkForWin() {
    console.log("checkForWin");

    for (let cell of document.querySelectorAll("td")) {
        if (cell.classList.contains("on")) {
            return false;
        }
    }
    return true;
}

// pop up a winning message & reset

function handleWin() {
    console.log("handleWin");

    alert("Great job!");
}

// Setup random board

function setupRandomBoard() {
    console.log("setupRandomBoard");

    for (let i = 0; i < DIFFICULTY; i++) {
        let x = randomNumber(WIDTH);
        let y = randomNumber(HEIGHT);
        toggleCellAndNeighbors(y, x);
    }
}

// Pick a random integer 0 ... upperRange-1

function randomNumber(upperRange) {
    console.log("randomNumber", upperRange);

    return Math.floor(Math.random() * upperRange);
}


addClickListeners();
setupRandomBoard();