// Initial inputs
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
let circleTurn;
const cellElement = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessage = document.getElementById('winning-message');
const winningMessageText = document.getElementById('winning-message-text');
const restartButton = document.getElementById('button');
const WINNING_COMBINATIONS = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,5,8],
    [2,4,6]
];


// Logic section
startGame();
restartButton.addEventListener('click', () => {
    location.reload();
})

function startGame(){
    circleTurn = false;
    cellElement.forEach(cell => {
        cell.addEventListener("click",handleClick,{once:true})
    });
    setHoverBoard();    
}
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);
    if(checkWins(currentClass)){
        // console.log('win')
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurn();
        setHoverBoard();
    }
    
}

function endGame(draw){
    if(draw){
winningMessageText.innerHTML = "Draw!";
    }else{
        winningMessageText.innerHTML = `${circleTurn ? "O's" : "X's"} Wins!`;
    }

    winningMessage.classList.add('show');
}


function isDraw(){
    return [...cellElement].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass)
}
function swapTurn(){
    circleTurn = !circleTurn;
}

function setHoverBoard(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS);
    }
}

// check for win
function checkWins(currentClass){
return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
        return cellElement[index].classList.contains(currentClass)
    })
})
}