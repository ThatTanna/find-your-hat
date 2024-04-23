const prompt = require("prompt-sync")({ sigint: true });
const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

const _OUTOFBOUNDS = "Oopsie daisie🌼, watch where you're going bruh!";
const _WIN = "- Victory Fanfare 🎺- You found the hat! CONGRATS!!";
const _LOSE = "YOU FELL FOR IT, FOOL! THUNDER CROSS SPLIT ATTACK! ⚡";
const _QUIT = "Exiting game.. goodbye!👋";

// Set constants to ask the player for inputs on the number of tiles for the game (width and height)
const _MIN = 5, _MAX = 100;
const _WIDTHPROMPT = `Enter the no. of tiles for the width (min. ${_MIN} - max. ${_MAX}): `;
const _HEIGHTPROMPT = `Enter the no. of tiles for the height (min. ${_MIN} - max. ${_MAX}): `;
const _INVALID = `Please enter a valid number between ${_MIN}-${_MAX}.`;

class Field {
    // 5. Constructor initialization. Note: The field created for the game is a 2D-array
    constructor(field = new Array([])) {
        this.playGame = false; // Set the gameplay to flase
        this.field = field; // Set the field that was passed in
        this.positionX = 0; // Set player's initial position x:0;
        this.positionY = 0; // Set player's initial position y:0;
        this.field[0][0] = pathCharacter;
    }

    // 6. Start the game
    startGame() {
        this.playGame = true;

        // Print the game instructions
        this.printInstructions();

        while (this.playGame) {
            // TODO: Print maze
            this.printMaze();
            // TODO: Prompt the player to move
            this.promptMove();
            // TODO: track the player's position
            this.trackPlayer();

            // Show pathCharacter at its current position
            this.field[this.positionY][this.positionX] = pathCharacter;
        }

    }

    // 7. Print the game instructions
    printInstructions() {
        console.log('To move the character, enter:\n> "w" to move up\n> "s" to move down\n> "a" to move left\n> "d" to move right\n> "q" or CTRL + C to quit.\n')
    }

    // 8. Print Maze
    printMaze() {
        // Going through and console.log each element
        // TODO: concatenate the field generated into a string
        for (const f of this.field) {
            console.log(f.join(""));
        }
    }

    // 9. Prompt the player to make the next move
    promptMove() {
        var moveDirection = prompt("Which way? ");

        // Convert player's input to lowercase before checking
        moveDirection = moveDirection.toLowerCase();

        // TODO: Move base on input for moveDirection
        // (inform the player if it is an invaid move or the game has ended via "q")

        switch (moveDirection) {
            case 'w':
                this.positionY--;
                break;

            case 'a':
                this.positionX--;
                break;

            case 's':
                this.positionY++;
                break;

            case 'd':
                this.positionX++;
                break;

            case 'q':
                console.log(_QUIT);
                this.playGame = false;
                break;

            default:
                console.log("Invalid input: Please use [w][a][s][d] to move, GAMER.");
                break;
        }
    }

    // 10. // Check if user has gone off-bounds, fallen into the hole or found the hat
    trackPlayer() {

        let status = "";

        // TODO: Set the condition to check if user has gone off-bounds, fallen into the hole or found the hat
        switch (true) {
            // Character goes out of bounds
            case this.positionY < 0 ||
                this.positionY > this.field.length - 1 ||
                this.positionX < 0 ||
                this.positionX > this.field.length - 1:
                // console.log(_OUTOFBOUNDS);
                this.endGame(_OUTOFBOUNDS) = true;
                break;

            // Character fall into hole
            case this.field[this.positionY][this.positionX] == hole:
                // console.log(_LOSE);
                this.endGame(_LOSE) = true;
                break;

            // Character found hat
            case this.field[this.positionY][this.positionX] == hat:
                // console.log(_WIN);
                this.endGame(_WIN) = true;
                break;

            default:
                break;
        }

        return status;
    }

    // 12. End the game with the message passed in
    endGame(msg) {
        // TODO: End the game with the message passed in
        this.playGame = false;
        console.log(msg);
        // Use a process code to exit the program (One-liner)
        process.exit();
    }

    // 1. Set the game width and height (Static Method)
    static gameDimensions() {
        const width = this.setDimensions(_WIDTHPROMPT);
        const height = this.setDimensions(_HEIGHTPROMPT);

        return { width, height };
    }

    static setDimensions(prompter) {

        let dimensionStatus = false;
        let dimension = 0;

        while (!dimensionStatus) {
            dimension = prompt(prompter);
            if (isNaN(dimension) || dimension < _MIN || dimension > _MAX) {
                console.log(_INVALID);
            } else {
                this.printDimension(prompter, dimension);
                dimensionStatus = true;
            }
        }
        return dimension;
    }

    // 3. Create a message for the width OR height set
    static printDimension(prompter, dimension) {
        prompter === _WIDTHPROMPT ? console.log(`Width set: ${dimension} \n`) : console.log(`Height set: ${dimension}`);
        // prompter === _WIDTHPROMPT ? console.log("Width set:" + dimension) : console.log("Height set: " + dimension);
    }

    // 4. Creating the game's 2D field
    static createField(width, height) {

        // Create field (a 2D-array), by the height and width pass in
        const field = new Array(height).fill("").map(e => new Array(width));

        // Create a random number between 0.1 to 0.2, keep the values at 1 decimal place
        let limit = Math.round((Math.random() * 0.1 + 0.1) * 10) / 10;

        // For each unit in y (column)
        for (let y = 0; y < height; y++) {
            // For each unit in x (row), setting up the tiles
            for (let x = 0; x < width; x++) {
                // Generate a random value between 0.1 to 1
                const ceiling = Math.round(Math.random() * 10) / 10;
                field[y][x] = limit < ceiling ? fieldCharacter : hole;
            }
        }
        // console.log(field);
        let hatY, hatX;
        do {
            hatY = Math.floor(Math.random() * height);
            hatX = Math.floor(Math.random() * width);
        } while (hatY == 0 && hatX == 0);

        field[hatY][hatX] = hat;

        return field;
    }
}

// Clear the screen
console.clear();

// Print a welcome message and prompt the player to setup the tiles for the maze
console.log("Welcome to Find Your Hat Maze!\n******************************\n");

// Setting the tiles for the game
const gameDimensions = Field.gameDimensions();

// Create a 2D-array of the game's field using gameDimensions' width and height
const createField = Field.createField(Number(gameDimensions.width), Number(gameDimensions.height));

// Instantiate gameField as the instance of Field class AND call its startGame() method to begin the game
const gameField = new Field(createField);
gameField.startGame();