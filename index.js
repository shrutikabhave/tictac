/**
* This program is a boilerplate code for the standard tic tac toe game
* Here the “box” represents one placeholder for either a “X” or a “0”
* We have a 2D array to represent the arrangement of X or O is a grid
* 0 -> empty box
* 1 -> box with X
* 2 -> box with O
*
* Below are the tasks which needs to be completed:
* Imagine you are playing with the computer so every alternate move should be done by the computer
* X -> player
* O -> Computer
*
* Winner needs to be decided and has to be flashed
*
* Extra points will be given for approaching the problem more creatively
* 
*/

const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';
var win = false;

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
    if ( checkWinner() ) {
        win = true;
        setMessage(turn + " WON!!");
    }
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    
    if( grid[colIdx][rowIdx] == 0 && !win){
        if( turn == 'X'){
            let newValue = 1;
            grid[colIdx][rowIdx] = newValue;     
            renderMainGrid();
            addClickHandlers();
            turn = '0';
        }
        if( !win ){
            computersTurn();
        }
    } else if( win ){
        setMessage("Game Over!");
    }
    
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}

function computersTurn(){
    let checked = false;

    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        for (let rowIdx = 0; rowIdx < GRID_LENGTH;rowIdx++) {
            if( grid[colIdx][rowIdx] == 0 ){
                grid[colIdx][rowIdx] = 2;
                checked = true;
                break;
            }
        }

        if( checked ){
            break;
        }
    }
    
    renderMainGrid();
    addClickHandlers();
    
    turn = 'X';
}

function setMessage( msg){
    document.getElementById("message").innerHTML = msg;
}

function checkWinner( ){
    //row win
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {    
        if( ( grid[colIdx][0] != 0 && grid[colIdx][1] != 0 && grid[colIdx][2] != 0 && 
            grid[colIdx][0] == grid[colIdx][1] && grid[colIdx][2] == grid[colIdx][0] ) ){
            return true;
        }
    }
    //col win
    for (let rowIdx = 0;rowIdx < GRID_LENGTH; rowIdx++) {    
        if( ( grid[0][rowIdx] != 0 && grid[1][rowIdx] != 0 && grid[2][rowIdx] != 0 && 
            grid[0][rowIdx] == grid[1][rowIdx] && grid[0][rowIdx] == grid[2][rowIdx] ) ){
            return true;
        }
    }
    //diagonal win
    if( ( grid[0][0] != 0 && grid[1][1] != 0 && grid[2][2] != 0 && 
            grid[0][0] == grid[1][1] && grid[0][0] == grid[2][2] ) ){
        return true;
    } else if( ( grid[0][2] != 0 && grid[1][1] != 0 && grid[2][0] != 0 && 
            grid[0][2] == grid[1][1] && grid[0][2] == grid[2][0] ) ){
        return true;
    }
    return false;
}

function startGame() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            grid[colIdx][rowidx]= 0;
        }
    } 
    win = false;
    turn = 'X';
    setMessage('');
    renderMainGrid();
    addClickHandlers();
}

initializeGrid();
renderMainGrid();
addClickHandlers();
