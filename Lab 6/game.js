// Game state variables
let gameStarted = false;
let wins = 0;
let losses = 0;
let draws = 0;
let roundCount = 0;
let results = [];

// Starts the game after validating the player's name
function startGame() {
    let nameInput = document.getElementById("playerName").value.trim();

    if (nameInput === "") {
        alert("Please enter your name.");
        return;
    }

    gameStarted = true;
    document.getElementById("welcomeMsg").innerHTML = "Welcome, <strong>" + nameInput + "</strong>!";
    document.getElementById("startTime").innerHTML = "Game started on: " + new Date();
}

// Randomly selects rock, paper, or scissors for the computer
function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

// Plays one round of Rock, Paper, Scissors
function playRound(playerChoice) {
    // Prevent playing if Start Game has not been clicked
    if (!gameStarted) {
        alert("Click Start Game first.");
        return;
    }

    let computerChoice = getComputerChoice();
    roundCount++;

    // Update images for both player and computer
    document.getElementById("playerImg").src = playerChoice + ".jpg";
    document.getElementById("computerImg").src = computerChoice + ".jpg";

    let roundResult = "";
    let resultEl = document.getElementById("result");

    // Determine the winner using if...else
    if (playerChoice === computerChoice) {
        roundResult = "Draw";
        draws++;
        resultEl.innerHTML = "It's a Draw! Both chose " + playerChoice + ".";
        resultEl.style.color = "grey";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "scissors" && computerChoice === "paper") ||
        (playerChoice === "paper" && computerChoice === "rock")
    ) {
        roundResult = "Win";
        wins++;
        resultEl.innerHTML = "You Win! " + playerChoice + " beats " + computerChoice + ".";
        resultEl.style.color = "green";
    } else {
        roundResult = "Lose";
        losses++;
        resultEl.innerHTML = "You Lose! " + computerChoice + " beats " + playerChoice + ".";
        resultEl.style.color = "red";
    }

    // Store result in array and update scoreboard
    results.push(roundResult);
    document.getElementById("wins").innerHTML = wins;
    document.getElementById("losses").innerHTML = losses;
    document.getElementById("draws").innerHTML = draws;

    // Append new row to the history table
    let historyBody = document.getElementById("historyBody");
    historyBody.innerHTML +=
        "<tr>" +
            "<td>" + roundCount + "</td>" +
            "<td>" + playerChoice + "</td>" +
            "<td>" + computerChoice + "</td>" +
            "<td>" + roundResult + "</td>" +
        "</tr>";
}

// Calculates total rounds and win percentage using a for loop
function showSummary() {
    if (results.length === 0) {
        document.getElementById("summaryText").innerHTML = "No rounds played yet.";
        return;
    }

    let winCount = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i] === "Win") {
            winCount++;
        }
    }

    let winPercentage = Math.round((winCount / results.length) * 100);
    document.getElementById("summaryText").innerHTML =
        "You played " + results.length + " rounds and won " + winPercentage + "%";
}

// Resets scores, history table, arrays, and messages back to initial state
function resetGame() {
    wins = 0;
    losses = 0;
    draws = 0;
    roundCount = 0;
    results = [];

    document.getElementById("wins").innerHTML = "0";
    document.getElementById("losses").innerHTML = "0";
    document.getElementById("draws").innerHTML = "0";
    document.getElementById("historyBody").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("summaryText").innerHTML = "";
    document.getElementById("playerImg").src = "rock.jpg";
    document.getElementById("computerImg").src = "rock.jpg";
}