let activePlayer = 1;
let start = false;
let grey = "rgb(150, 150, 150)";
let lightGrey = "rgb(230, 230, 230)";
let red = "rgb(255, 115, 115)";
let green = "rgb(53, 197, 53)";

let currentScore, playerColor, activePlayerSymbol, playerScore, winner;
let newGameButton = document.querySelector(".new-game-button");
let diceImg = document.querySelector(".dice-img");
let rollDiceButton = document.querySelector(".roll-dice-button");
let holdButton = document.querySelector(".hold-button");


function dynamicQuery(){
    playerColor = document.querySelector("#player-" + activePlayer);
    activePlayerSymbol = document.querySelector("#player-" + activePlayer + " > .active");
    playerScore = document.querySelector("#player-" + activePlayer + "-score");
    currentScore = document.querySelector("#player-" + activePlayer + "-current-score");
    winner = document.querySelector("#win" + activePlayer);
}

function randomNum() {
    return Math.floor(Math.random() * 6) + 1;
}

function newGame() {
    reset();
    start = true
    let randNumber = randomNum();
    while (randNumber == 1) {
        randNumber = randomNum();
    }
    dynamicQuery();

    newGameButton.style.color = grey;
    playerColor.style.color = "black";
    activePlayerSymbol.style.backgroundColor = red;
    playerScore.textContent = "0";
    diceImg.src = `image/dice-${randNumber}.png`;
    currentScore.textContent = String(randNumber);
}

function reset() {
    function resetProperty() {
        playerColor.style.color = grey;
        activePlayerSymbol.style.backgroundColor = lightGrey;
        playerScore.textContent = "0";
        currentScore.textContent = "0";
        winner.style.visibility = "hidden";
    }

    for (let i = 2; i > 0; i--) {
        activePlayer = i;
        dynamicQuery();
        resetProperty();
    }
}

function rollDice() {
    if (start) {
        randNumber = randomNum();
        if (randNumber == 1) {
            while (randNumber == 1) {
                randNumber = randomNum();
            }
            currentScore.textContent = "0";
            playerColor.style.color = grey;
            activePlayerSymbol.style.backgroundColor = lightGrey;
            activePlayer = activePlayer == 1 ? 2 : 1;
            dynamicQuery();
            playerColor.style.color = "black";
            activePlayerSymbol.style.backgroundColor = red;
        }
        diceImg.src = `image/dice-${randNumber}.png`;
        currentScore.textContent = String(Number(currentScore.textContent) + randNumber);
    }
}

function hold() {
    if (start) {
        playerScore.textContent = String(Number(playerScore.textContent) + Number(currentScore.textContent));
        if (win()) {
            return;
        }
        currentScore.textContent = "0";
        playerColor.style.color = grey;
        activePlayerSymbol.style.backgroundColor = lightGrey;
        activePlayer = activePlayer == 1 ? 2 : 1;
        dynamicQuery();
        playerColor.style.color = "black";
        activePlayerSymbol.style.backgroundColor = red;
        while (randNumber == 1) {
            randNumber = randomNum();
        }
        diceImg.src = `image/dice-${randNumber}.png`;
        currentScore.textContent = String(Number(currentScore.textContent) + randNumber);
    }
}

function win() {
    if (Number(playerScore.textContent) >= 100) {
        start = false;
        winner.style.visibility = "visible";
        newGameButton.style.color = red;
        return true;
    }
}

newGameButton.onclick = newGame;
rollDiceButton.onclick = rollDice;
holdButton.onclick = hold;
