

const prova = document.querySelector("#prova")

prova.textContent = "PROVA script"


const gameboard = (function createGameboard() {
    const gameboard =
        [[" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "]]
    const DEBUG = true
    const getFreeSpaces = function () {
        let row_count = 0
        let col_count = 0
        const free_arr = []
        gameboard.forEach(arr => {
            arr.forEach(space => {
                if (space == " ") {
                    free_arr.push({ "row": row_count, "col": col_count })
                    col_count += 1
                }

            })
            col_count = 0
            row_count += 1

        });
        return free_arr

    }
    const displayMove = function (move, symbol) {
        const { row, col } = move
        console.log(move)
        console.log(row)
        console.log(col)
        gameboard[row][col] = symbol
        if (DEBUG) {
            console.log(gameboard.toString())
        }
    }

    const checkMoveValidity = function (move) {
        const free_arr = getFreeSpaces()
        console.log(typeof (move))
        free_arr.array.forEach(element => {
            if (move == element) {
                return true
            }
        });
        return false

    }

    const checkFull = function () {
        const free_arr = getFreeSpaces()
        if (free_arr.length <= 0) {
            return true
        }
        return false
    }


    return { gameboard, getFreeSpaces, displayMove }
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
        // const move = prompt(`decidi mossa per player ${name} `)
        // console.log(move)
        // console.log(typeof (move))
        // return move

    }
    return { name, decideMove, sayHi }

}

player_1 = createTicTacToePlayer("john")
player_2 = createTicTacToePlayer("andy")

const game =
    (function createGame(gameboard, p1, p2) {

        let active_player = p1
        let active_player_symbol = "o"
        let winner = "none"

        const changeActivePlayer = () => {
            if (active_player === p1) {
                active_player = p2
                active_player_symbol = "x"
            } else {
                active_player = p1
                active_player_symbol = "o"
            }
        }


        const playMove = () => {

            // const played_move = active_player.decide_move(gameboard)
            gameboard.checkMoveValidity()
            //se apposto
            gameboard.displayMove(played_move, active_player_symbol)
            //se non ended
            changeActivePlayer()
            console.log(`E il turno di ${active_player.name} con simbolo ${active_player_symbol}`)
        }

        const checkWin = function () {

        }


        const checkGameEnding = function () {
            const isFull = gameboard.checkFull()
            const isWon = checkWin()

            if (isWon) {
                console.log(`Winner ${winner}`)
            }
            if (isFull && !isWon) {
                console.log("Parita")
            }

        }


        console.log("Gioco creato")
        console.log(`E il turno di ${active_player.name}`)


        return { playMove }

    })(gameboard, player_1, player_2)

