let currMoleTile;
let currPlantTile;
let moleInterval;
let PlantInterval;
let score = 0;
let gameOver = false;
let leaderboard = [];

window.onload = function() {
    setGame();
}

function setGame() {
    //Sets up the grid for the game board in html
    for (let i =0; i < 9; i++) { //i goes from 0 to 8, stops at 9
        //<div id="0-8"></div>
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);

    }

    moleInterval = setInterval(setMole, 1000); //1000 milliseconds = 1 seconds
    PlantInterval = setInterval(setPlant, 2000); //2000 milliseconds = 2 seconds
}

function getRandomTile() {
    // math.random --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
    let num = Math.floor(Math.random() * 9)
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let mole = document.createElement("img");
    mole.src = "./Sukuna.png";

    //random tile generator for Sukuna
    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) {
        return;
    }
    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    //game over function
    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let plant = document.createElement("img");
    plant.src = "./Yuji.png";

    //random tile generator for Yuji
    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) {
        return;
    }
    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    //game over function
    if (gameOver) {
        return;
    }

    if (this == currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString(); //update score
    }
    else if (this == currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;
        handleGameOver();
    }
}

//reset button to restart game
function reset(){
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText="0";
    document.getElementById("leaderboardSection").style.display = "none";
    document.getElementById("board").style.display = "flex";
    clearInterval(moleInterval);
    clearInterval(PlantInterval);
    setGame();
}
//game over function
function handleGameOver(){
    if(gameOver){
        //hide game and prompt player for initials
        document.getElementById("board").innerHTML = "";
        document.getElementById("board").style.display = "none";
        document.getElementById("leaderboardSection").style.display ="flex";
        const playerInitials = prompt("Enter your Initials:");
        //function calls to display and sort leader board
        updateLeaderboard(playerInitials, score);
        displayLeaderboard();
    }
}
//creating leaderboard array
function updateLeaderboard(playerInitials, playerScore){
    //create player object from initials and score
    const player = {initials: playerInitials, score: playerScore};
    //push player object into leaderboard array
    leaderboard.push(player);
    //sort through objects based on score
    leaderboard.sort((a,b) => b.score - a.score);
    // only keep top 3
    if (leaderboard.length > 3){
        leaderboard.pop();
    }
}
//displays the leaderboard
function displayLeaderboard(){
    //clear previous leaderboard list items
    const topPlayers = document.getElementById("leaderboardList");
    topPlayers.innerHTML = "";
    //loop to traverse leaderboard array
    leaderboard.forEach((player,index) => {
        const position = index + 1;
        const listItem = document.createElement("li");
        //display list items
        listItem.textContent = `${position}: ${player.initials} - ${player.score} pts`;
        topPlayers.appendChild(listItem);
    });
}