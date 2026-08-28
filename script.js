


const gameboard = (function createGameboard() {
    let gameboard =
        [[" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]]
    let freeSpaces = 9
    let isFull = false
    let listeners = []

    const onChange = function (cb) {
        listeners.push(cb)
    }

    const notify = function () {
        listeners.forEach((listenerCb) => listenerCb())
    }

    const resetBoard = function () {
        gameboard =
            [[" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "]]
        freeSpaces = 9
        isFull = false
        notify()
    }

    const getFreeSpaces = function () {
        let row_count = 0
        let col_count = 0
        const free_arr = []
        gameboard.forEach(arr => {
            arr.forEach(space => {
                if (space == " ") {
                    free_arr.push({ "row": row_count, "col": col_count })

                }
                col_count += 1

            })
            col_count = 0
            row_count += 1

        });
        if (free_arr.length == 0) {
            isFull = true
        }
        return free_arr

    }
    const displayMove = function (move, symbol) {
        const { row, col } = move

        gameboard[row][col] = symbol
        freeSpaces -= 1
        if (freeSpaces <= 0) {
            isFull = true
        }
        notify()

    }

    const getBoard = function () {
        return gameboard.slice()
    }

    const isMoveValid = function (move) {
        const free_arr = getFreeSpaces()

        function isSameMove(move1, move2) {
            return move1.row === move2.row && move1.col === move2.col
        }
        return free_arr.some(space => {
            return isSameMove(space, move)
        });


    }

    const checkFull = function () {
        return isFull
    }

    const getLines = function () {
        lines = []
        gameboard.forEach(row => lines.push(row))


        for (let c = 0; c < gameboard[0].length; c += 1) {

            col = []
            for (let r = 0; r < gameboard.length; r += 1) {//assume no row has more columns than the others
                col.push(gameboard[r][c])


            }
            lines.push(col)

        }

        //diag
        const diag1 = []
        for (let r = 0; r < gameboard.length; r += 1) {

            let c = r
            diag1.push(gameboard[r][c])

        }
        lines.push(diag1)
        const diag2 = []
        for (let r = gameboard.length - 1; r >= 0; r -= 1) {

            let c = Math.abs(r - (gameboard.length - 1))
            diag2.push(gameboard[r][c])
        }

        lines.push(diag2)

        return lines
    }

    const toString = function () {
        return gameboard.toString()
    }


    return {
        toString, getFreeSpaces, displayMove,
        checkFull, getLines, isMoveValid, getBoard, onChange, resetBoard
    }
})()

function createPlayer(name) {
    const sayHi = function () {
        console.log("Hi!")
    }

    return { name, sayHi }


}

function createTicTacToePlayer(playerName) {
    const { name, sayHi } = createPlayer(playerName)

    const decideMove = function (gameboard) {


    }
    return { name, decideMove, sayHi }

}

player_1 = createTicTacToePlayer("john")
player_2 = createTicTacToePlayer("andy")

const game =
    (function createGame(gameboard, p1, p2) {

        const symbols = ["󰄛", ""]
        let active_player = p1
        let active_player_symbol = symbols[0]
        let winner = "none"
        let isWon = false




        const resetGame = function () {
            gameboard.resetBoard()
            active_player = p1
            active_player_symbol = symbols[0]
            winner = "none"
            isWon = false
            displayCreateMessage()
        }
        const getCurrentSymbol = function () {
            return active_player_symbol
        }
        const displayCreateMessage = function () {
            console.log("Gioco creato")
            displayChangeMessage()
        }
        const displayChangeMessage = function () {
            console.log(`E il turno di ${active_player.name} con simbolo ${active_player_symbol}`)
        }
        const changeActivePlayer = () => {
            if (active_player === p1) {
                active_player = p2
                active_player_symbol = symbols[1]
            } else {
                active_player = p1
                active_player_symbol = symbols[0]
            }

            displayChangeMessage()

        }



        const displayEndingMessage = function () {
            console.log("Gioco finito")
            console.log("Restart per riprovare")
        }
        const playMove = (played_move) => {

            if (isWon) {

                displayEndingMessage()
                return

            }
            const isValidMove = gameboard.isMoveValid(played_move)

            //se apposto
            if (!isValidMove) {
                console.log("Mossa non valida, riprova")
                return
            }
            gameboard.displayMove(played_move, active_player_symbol)
            console.log(`gameboard dopo mossa: ${gameboard.toString()}`)
            const isGameDone = checkGameEnding()
            if (!isGameDone) {
                changeActivePlayer()


            } else {
                displayEndingMessage()

            }

        }

        const checkWin = function (symbol) {
            const lines = gameboard.getLines()
            return lines.some(winningLine => {
                const isAllSymbol = winningLine.every(el => el === symbol)
                if (isAllSymbol) {
                    console.log("E' vinta, con linea:")
                    console.log(winningLine)


                } else {
                    console.log(`la linea ${winningLine} non va bene per la vincita,continuo..`)
                }
                return isAllSymbol

            })

        }


        const checkGameEnding = function () {
            const isFull = gameboard.checkFull()
            const hasWon = checkWin(active_player_symbol)
            let isGameDone = false

            if (hasWon) {
                isWon = true
                winner = active_player
                console.log(`Winner ${winner}`)
                isGameDone = true


            } else if (isFull) {
                console.log("Parita")
                isGameDone = true
            }
            return isGameDone

        }


        displayCreateMessage()


        return { playMove, resetGame, getCurrentSymbol }

    })(gameboard, player_1, player_2)



const renderer = (function createRenderer(gameboard, game) {
    let cells = document.querySelectorAll(".game>div")
    let restartButton = document.querySelector(".restart")
    let originalContent = " "
    const getMoveFromClass = function (cell) {
        const classes = cell.classList
        let row = 0
        let col = 0
        const row_class = classes[0]
        const col_class = classes[1]
        if (row_class === "top") {
            row = 0
        } else if (row_class === "mid") {
            row = 1
        } else if (row_class === "bottom") {
            row = 2
        }

        if (col_class === "left") {
            col = 0
        } else if (col_class === "middle") {
            col = 1
        } else if (col_class === "right") {
            col = 2
        }
        console.log(`Mossa e ${row} ${col}`)
        return { "row": row, "col": col }
    }

    gameboard.onChange(() => {
        const board = gameboard.getBoard()
        board.forEach((row, index) => {
            for (let i = 0; i < row.length; i += 1) {
                cells[index * row.length + i].textContent = row[i]

            }

        })
    })





    cells.forEach((cell) => cell.addEventListener("click", (event) => {
        const playedMove = getMoveFromClass(cell)
        originalContent = game.getCurrentSymbol()
        game.playMove(playedMove)
        cell.classList.remove("text-transparent")




    }))

    cells.forEach((cell) => cell.addEventListener("mouseover", (event) => {
        const hoveringMove = getMoveFromClass(cell)
        originalContent = cell.textContent
        if (gameboard.isMoveValid(hoveringMove)) {

            const currentSymbol = game.getCurrentSymbol()
            cell.classList.add("text-transparent")
            cell.textContent = currentSymbol


        }


    }))
    cells.forEach((cell) => cell.addEventListener("mouseout", (event) => {
        cell.textContent = originalContent.slice(0)
        cell.classList.remove("text-transparent")


    }))

    restartButton.addEventListener("click", (event) => {
        game.resetGame()
    })


})(gameboard, game)