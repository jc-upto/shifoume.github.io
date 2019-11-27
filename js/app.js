let playerArea = document.getElementById("player");
let computerArea = document.getElementById("computer");
let counter  = document.getElementById("counter");
let scores = document.getElementById("scores");
let lastRounds = document.getElementById("last-rounds");

let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");

let game = new Game();

rock.addEventListener("click", function() {
    if(!game.nowPlaying.flag) {
        game.player.setChoice("rock");
        game.displayGameResult(playerArea, computerArea, counter, scores, lastRounds);
    }
});

paper.addEventListener("click", function() {
    if(!game.nowPlaying.flag) {
        game.player.setChoice("paper");
        game.displayGameResult(playerArea, computerArea, counter, scores, lastRounds);
    }
});

scissors.addEventListener("click", function() {
    if(!game.nowPlaying.flag) {
        game.player.setChoice("scissors");
        game.displayGameResult(playerArea, computerArea, counter, scores, lastRounds);
    }
});

