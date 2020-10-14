let activePlayer = 1;
let start = false;

let currentScore, activePlayerColor, activePlayerSymbol, activePlayerScore, winner;
let newGameButton = document.querySelector(".new-game");
let diceImg = document.querySelector(".dice-img");
let rollDiceButton = document.querySelector(".roll-dice");
let holdButton = document.querySelector(".hold");
let grey = "rgb(150, 150, 150)";
let lightGrey = "rgb(230, 230, 230)";
let red = "rgb(255, 115, 115)";
let green = "rgb(53, 197, 53)";


function randomNum() {
    return Math.floor(Math.random() * 6) + 1;
}

function dynamicQuery(){
    currentScore = document.querySelector(".player-" + activePlayer + "-current-score");
    activePlayerColor = document.querySelector(".player-" + activePlayer);
    activePlayerSymbol = document.querySelector(".player-" + activePlayer + " > .active");
    activePlayerScore = document.querySelector(".player-" + activePlayer + "-score");
    winner = document.querySelector("#win" + activePlayer);
}

function newGame() {
    activePlayer = 2;
    dynamicQuery();
    reset();
    activePlayer = 1;
    dynamicQuery();
    reset();
    start = true
    let randNumber = randomNum();
    newGameButton.style.color = grey;
    diceImg.style.visibility = "visible";
    activePlayerColor.style.color = "black";
    activePlayerSymbol.style.backgroundColor = red;
    activePlayerScore.textContent = "0";
    while (randNumber == 1) {
        randNumber = randomNum();
    }
    diceImg.src = `image/dice-${randNumber}.png`;
    currentScore.textContent = String(randNumber);
}

function reset() {
    activePlayerColor.style.color = grey;
    activePlayerSymbol.style.backgroundColor = lightGrey;
    activePlayerScore.textContent = "0";
    currentScore.textContent = "0";
    winner.style.visibility = "hidden";
}

function rollDice() {
    if (start) {
        randNumber = randomNum();
        if (randNumber == 1) {
            currentScore.textContent = "0";
            activePlayer = activePlayer == 1 ? 2 : 1;
            activePlayerColor.style.color = grey;
            activePlayerSymbol.style.backgroundColor = lightGrey;
            dynamicQuery();
            activePlayerColor.style.color = "black";
            activePlayerSymbol.style.backgroundColor = red;
            while (randNumber == 1) {
                randNumber = randomNum();
            }
        }

        diceImg.src = `image/dice-${randNumber}.png`;
        currentScore.textContent = String(Number(currentScore.textContent) + randNumber);
    }
}

function hold() {
    if (start) {
        activePlayerScore.textContent = String(Number(activePlayerScore.textContent) + Number(currentScore.textContent));
        if (check()) {
            return;
        }
        currentScore.textContent = "0";
        activePlayerColor.style.color = grey;
        activePlayerSymbol.style.backgroundColor = lightGrey;
        activePlayer = activePlayer == 1 ? 2 : 1;
        dynamicQuery();
        activePlayerColor.style.color = "black";
        activePlayerSymbol.style.backgroundColor = red;
        while (randNumber == 1) {
            randNumber = randomNum();
        }
    
        diceImg.src = `image/dice-${randNumber}.png`;
        currentScore.textContent = String(Number(currentScore.textContent) + randNumber);
    }
}

function check() {
    if (Number(activePlayerScore.textContent) >= 100) {
        start = false;
        winner.style.visibility = "visible";
        newGameButton.style.color = red;
        return true;
    }
}

newGameButton.onclick = newGame;
rollDiceButton.onclick = rollDice;
holdButton.onclick = hold;

console.log(activePlayerSymbol)
