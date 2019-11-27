/**
 * Handle the game.
 */
class Game {

    /**
     * Construct the Game element.
     */
    constructor() {
        this.player = new Shifoumi();
        this.computer = new Shifoumi(true);
        this.nowPlaying = {};
        this.nowPlaying.flag = false;
    }


    /**
     * Get the next choice.
     */
    displayGameResult(userElement, computerElement, counter, scoresTable, roundsTable) {
        this.nowPlaying.flag = true;
        this._deleteImagesElements();

        userElement.appendChild(this.player.fire());

        let dec = 3;
        let counterInterval = setInterval(function(computer, player, computerElement, counter, scoresTable, roundsTable, action, nowPlaying) {
            counter.innerHTML = dec;

            if(dec === 0) {
                clearInterval(counterInterval);
                counter.innerHTML = "Shifoumi !";
                computerElement.appendChild(computer.fire());
                action(player, computer, scoresTable, roundsTable);
                nowPlaying.flag = false;
            }

            dec--;
        }, 1000, this.computer, this.player, computerElement, counter, scoresTable, roundsTable, this._computeAndDisplayResult, this.nowPlaying);

    }


    /**
     * Compute game result and display infos.
     * @param player
     * @param computer
     * @param scoresTable
     * @private
     */
    _computeAndDisplayResult(player, computer, scoresTable, roundsTable) {
        switch(player.getLastChoice()) {
            // Compute last result.
            case "rock" :
                if(computer.getLastChoice() === "paper") {
                    scoresTable.rows[1].cells[1].innerHTML = parseInt(scoresTable.rows[1].cells[1].innerHTML) + 1;
                }
                else if(computer.getLastChoice() === "scissors") {
                    scoresTable.rows[1].cells[0].innerHTML = parseInt(scoresTable.rows[1].cells[0].innerHTML) + 1;
                }
                else {
                    scoresTable.rows[1].cells[2].innerHTML = parseInt(scoresTable.rows[1].cells[2].innerHTML) + 1;
                }
                break;
            case "paper" :
                if(computer.getLastChoice() === "scissors") {
                    scoresTable.rows[1].cells[1].innerHTML = parseInt(scoresTable.rows[1].cells[1].innerHTML) + 1;
                }
                else if(computer.getLastChoice() === "rock") {
                    scoresTable.rows[1].cells[0].innerHTML = parseInt(scoresTable.rows[1].cells[0].innerHTML) + 1;
                }
                else {
                    scoresTable.rows[1].cells[2].innerHTML = parseInt(scoresTable.rows[1].cells[2].innerHTML) + 1;
                }
                break;
            case "scissors":
                if(computer.getLastChoice() === "rock") {
                    scoresTable.rows[1].cells[1].innerHTML = parseInt(scoresTable.rows[1].cells[1].innerHTML) + 1;
                }
                else if(computer.getLastChoice() === "paper") {
                    scoresTable.rows[1].cells[0].innerHTML = parseInt(scoresTable.rows[1].cells[0].innerHTML) + 1;
                }
                else {
                    scoresTable.rows[1].cells[2].innerHTML = parseInt(scoresTable.rows[1].cells[2].innerHTML) + 1;
                }
                break;
        }

        // Append the last result to the rounds table.
        let tr = roundsTable.insertRow(1); // Inserting on top.

        let timeCell = tr.insertCell(0);
        let playerCell = tr.insertCell(1);
        let computerCell = tr.insertCell(2);

        let playerImage = player.getLastGames()[player.getLastGames().length - 1];
        playerImage.classList.remove("img-shifumi"); // To prevent them to be deleted by _deleteImagesElements.

        let computerImage = computer.getLastGames()[computer.getLastGames().length - 1];
        computerImage.classList.remove("img-shifumi");

        let time = new Date();
        time = ("0" + time.getHours()).slice(-2) + ":" + ("0" + time.getMinutes()).slice(-2) + ":" + ("0" + time.getSeconds()).slice(-2);

        timeCell.appendChild(document.createTextNode(time));
        playerCell.appendChild(playerImage);
        computerCell.appendChild(computerImage);

    }


    /**
     * Delete all images elements with img-shifumi class name.
     * @private
     */
    _deleteImagesElements() {
        let images = document.getElementsByClassName("img-shifumi");
        let imgLen = images.length;

        for(let i = 0; i < imgLen; i++) {
            images[0].parentNode.removeChild(images[0]);
        }
    }

}

/**
 * Handle a Shifoumi game player
 */
class Shifoumi {

    /**
     * Construct a player
     */
    constructor(computer=false) {
        this.userChoice = null;
        this.computer = computer;
        this.games = [];
    }

    /**
     * Trigger a shifoumi.
     * @returns {*}
     */
    fire() {
        let image = new ShifoumiImage(this.userChoice, this.computer);
        let element = image.getElement();
        this.setChoice(image.getType());
        this.games.push(element.cloneNode());
        return element;
    }

    /**
     * Sets the current choice.
     * @param choice
     */
    setChoice(choice) {
        this.userChoice = choice;
    }

    /**
     * Return the last used choice.
     * @returns {null}
     */
    getLastChoice() {
        return this.userChoice;
    }

    /**
     * Return all rounds.
     * @returns {[]|Array}
     */
    getLastGames() {
        return this.games;
    }

}


/**
 * Handle a Shifoumi image to be added to the document.
 */
class ShifoumiImage {

    /**
     * Construct a Shifoume choice.
     */
    constructor(type, computer=false) {
        this.type = type;
        this.random = computer;

        this.values = {
            "rock"  : "assets/img/rock.png",
            "paper" : "assets/img/paper.png",
            "scissors" : "assets/img/scissors.png"
        }
    }


    /**
     * Return the shifoumi image element.
     * @returns {*}
     */
    getElement() {
        let img = document.createElement("img");
        img.classList.add("img-shifumi");

        if(!this.random) {
            img.src = this.values[this.type];
        }
        else {
            img.src = this.values[this._getRandomKey()];
        }

        return img;
    }


    /**
     * Return the int value of Shifoumi Element.
     */
    getType() {
        return this.type;
    }


    /**
     * Return a random image src path.
     */
    _getRandomKey() {
        this.type = Object.keys(this.values)[Math.floor(Math.random() * Object.keys(this.values).length)];
        return this.type;
    }
}