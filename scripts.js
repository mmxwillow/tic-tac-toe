let gameboard = document.querySelector(".gameboard");
let results = document.querySelector(".results");
let restart = document.querySelector(".restart");
let popup = document.querySelector(".popup");
let turn = true;

const playerFactory = (name) => {
    return { name };
};

const gameBoard = (() => {
    const grid = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]
    ];

    const printGrid = () => {
        grid.forEach((array, row) => {
            array.forEach((item, column) => {
                let box = document.createElement("div");

                box.className = "box";
                box.id = `${row}${column}`;
                box.textContent = item;

                box.addEventListener("click", function () {
                    displayController.changeSign(item, row, column);
                });

                gameboard.appendChild(box);
            });
        });
    };

    const checkForWin = () => {
        let winningSign = "";
        for (let i = 0; i < 3; i++) {
            if (grid[i][0] == grid[i][1] && grid[i][1] == grid[i][2] && grid[i][2] != " ") {
                winningSign = grid[i][0];
            }
            if (grid[0][i] == grid[1][i] && grid[1][i] == grid[2][i] && grid[2][i] != " ") {
                winningSign = grid[0][i];
            }
        }
        if (grid[0][0] == grid[1][1] && grid[1][1] == grid[2][2] && grid[2][2] != " ") {
            winningSign = grid[0][0];
        }
        if (grid[0][2] == grid[1][1] && grid[1][1] == grid[2][0] && grid[2][0] != " ") {
            winningSign = grid[0][2];
        }

        if (winningSign != "") {
            let p1 = document.querySelector("#player1").value;
            let p2 = document.querySelector("#player2").value;
            player1.name = (p1 != "") ? p1 : "player1";
            player2.name = (p2 != "") ? p2 : "player2";
            let winner = ((winningSign == "x") ? player1.name : player2.name).toUpperCase();
            results.textContent = `${winner} WON!`;
            popup.style.visibility = "visible";
            winningSign = "";
        }
    };

    const checkForDraw = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (grid[i][j] == " ") { return; }
            }
        }
        results.textContent = "IT'S A DRAW";
        popup.style.visibility = "visible";
    }

    const resetGrid = () => {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                grid[i][j] = " ";
                document.getElementById(`${i}${j}`).textContent = " ";
            }
        }

        popup.style.visibility = "hidden";
    }


    return { grid, printGrid, checkForWin, checkForDraw, resetGrid };
})();

const displayController = (() => {
    const changeSign = (item, row, column) => {

        const box = document.getElementById(`${row}${column}`);
        if (box.textContent !== " ") { return; }

        let sign = turn ? "x" : "o";

        gameBoard.grid[row][column] = sign;
        box.textContent = sign;
        turn = !turn;

        gameBoard.checkForWin();
        gameBoard.checkForDraw();
    };

    return { changeSign };
})();

const player1 = playerFactory("player1");
const player2 = playerFactory("player2");

gameBoard.printGrid();
restart.addEventListener('click', gameBoard.resetGrid);
