import React, { useEffect } from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import './TicTacToe.css'


const TicTacToe = () => {
    const [gameMode, setGameMode] = useState(null) // null, '1player', '2player'
    const [gridSize, setGridSize] = useState(null) // null, 3, 4, 5
    const [gameData, setGameData] = useState([])
    const [count, setCount] = useState(0)
    const [lock, setLock] = useState(false)
    const [selectedCell, setSelectedCell] = useState(0) // For keyboard navigation
    const [isComputerThinking, setIsComputerThinking] = useState(false)
    const [titleText, setTitleText] = useState("Tic Tac Toe")

    // Initialize game data based on grid size
    useEffect(() => {
        if (gridSize) {
            const totalCells = gridSize * gridSize
            setGameData(Array(totalCells).fill(""))
            setTitleText("Tic Tac Toe")
        }
    }, [gridSize])

    // AI Move using Minimax Algorithm
    const makeComputerMove = (currentData) => {
        setIsComputerThinking(true)
        
        setTimeout(() => {
            const bestMove = findBestMove(currentData)
            if (bestMove !== -1) {
                const newGameData = [...currentData]
                newGameData[bestMove] = "x"
                setGameData(newGameData)
                setCount(prev => prev + 1)
                
                checkWin(newGameData)
            }
            setIsComputerThinking(false)
        }, 500) // Small delay to make it feel more natural
    }

    // Minimax algorithm for AI with alpha-beta pruning and depth limiting
    const minimax = (board, depth, isMaximizing, alpha = -Infinity, beta = Infinity) => {
        // Depth limit based on grid size to prevent slowdown
        const maxDepth = gridSize === 4 ? 4 : gridSize === 5 ? 3 : 9
        
        const winner = checkWinner(board)
        
        if (winner === "x") return 10 - depth
        if (winner === "o") return depth - 10
        if (board.every(cell => cell !== "")) return 0
        if (depth >= maxDepth) return evaluateBoard(board) // Heuristic evaluation
        
        if (isMaximizing) {
            let bestScore = -Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "x"
                    const score = minimax(board, depth + 1, false, alpha, beta)
                    board[i] = ""
                    bestScore = Math.max(score, bestScore)
                    alpha = Math.max(alpha, score)
                    if (beta <= alpha) break // Alpha-beta pruning
                }
            }
            return bestScore
        } else {
            let bestScore = Infinity
            for (let i = 0; i < board.length; i++) {
                if (board[i] === "") {
                    board[i] = "o"
                    const score = minimax(board, depth + 1, true, alpha, beta)
                    board[i] = ""
                    bestScore = Math.min(score, bestScore)
                    beta = Math.min(beta, score)
                    if (beta <= alpha) break // Alpha-beta pruning
                }
            }
            return bestScore
        }
    }

    // Heuristic evaluation for deeper grids
    const evaluateBoard = (board) => {
        let score = 0
        const patterns = getWinPatterns()
        
        patterns.forEach(pattern => {
            const cells = pattern.map(i => board[i])
            const xCount = cells.filter(c => c === "x").length
            const oCount = cells.filter(c => c === "o").length
            
            if (xCount > 0 && oCount === 0) score += xCount
            if (oCount > 0 && xCount === 0) score -= oCount
        })
        
        return score
    }

    const findBestMove = (board) => {
        let bestScore = -Infinity
        let bestMove = -1
        
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "") {
                board[i] = "x"
                const score = minimax(board, 0, false)
                board[i] = ""
                
                if (score > bestScore) {
                    bestScore = score
                    bestMove = i
                }
            }
        }
        
        return bestMove
    }

    const checkWinner = (board) => {
        const winPatterns = getWinPatterns()
        
        for (let pattern of winPatterns) {
            const firstCell = board[pattern[0]]
            if (firstCell && pattern.every(index => board[index] === firstCell)) {
                return firstCell
            }
        }
        
        return null
    }

    const getWinPatterns = () => {
        if (!gridSize) return []
        
        const patterns = []
        
        // Win length requirements:
        // 3x3: Need 3 in a row
        // 4x4: Need 3 in a row  
        // 5x5: Need 4 in a row (Connect-4 style)
        const winLength = gridSize === 5 ? 4 : 3
        
        // Rows - check all possible winning combinations
        for (let i = 0; i < gridSize; i++) {
            for (let start = 0; start <= gridSize - winLength; start++) {
                const row = []
                for (let j = start; j < start + winLength; j++) {
                    row.push(i * gridSize + j)
                }
                patterns.push(row)
            }
        }
        
        // Columns - check all possible winning combinations
        for (let i = 0; i < gridSize; i++) {
            for (let start = 0; start <= gridSize - winLength; start++) {
                const col = []
                for (let j = start; j < start + winLength; j++) {
                    col.push(j * gridSize + i)
                }
                patterns.push(col)
            }
        }
        
        // Diagonals - check all possible winning combinations
        // Top-left to bottom-right diagonals
        for (let startRow = 0; startRow <= gridSize - winLength; startRow++) {
            for (let startCol = 0; startCol <= gridSize - winLength; startCol++) {
                const diag = []
                for (let i = 0; i < winLength; i++) {
                    diag.push((startRow + i) * gridSize + (startCol + i))
                }
                patterns.push(diag)
            }
        }
        
        // Top-right to bottom-left diagonals
        for (let startRow = 0; startRow <= gridSize - winLength; startRow++) {
            for (let startCol = winLength - 1; startCol < gridSize; startCol++) {
                const diag = []
                for (let i = 0; i < winLength; i++) {
                    diag.push((startRow + i) * gridSize + (startCol - i))
                }
                patterns.push(diag)
            }
        }
        
        return patterns
    }

    // Keyboard navigation
    useEffect(() => {
        if (!gridSize) return
        
        const totalCells = gridSize * gridSize
        const handleKeyPress = (e) => {
            if (lock || isComputerThinking) return;
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    setSelectedCell(prev => (prev + 1) % totalCells);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    setSelectedCell(prev => (prev - 1 + totalCells) % totalCells);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedCell(prev => (prev + gridSize) % totalCells);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedCell(prev => (prev - gridSize + totalCells) % totalCells);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (gameData[selectedCell] === "" && !lock && !isComputerThinking) {
                        toggle(null, selectedCell);
                    }
                    break;
                case 'r':
                case 'R':
                    e.preventDefault();
                    reset();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [lock, selectedCell, gridSize, isComputerThinking, gameData]);

    const toggle = (e, num) => {
        if (lock || gameData[num] !== "" || isComputerThinking) {
            return;
        }
        
        const newGameData = [...gameData];
        
        if (count % 2 === 0) {
            newGameData[num] = "o";
            setGameData(newGameData);
            setCount(count + 1);
            checkWin(newGameData);
            
            // If 1-player mode and game not over, make computer move
            if (gameMode === '1player' && !lock) {
                setTimeout(() => {
                    const winner = checkWinner(newGameData)
                    const isDraw = newGameData.every(cell => cell !== "")
                    if (!winner && !isDraw) {
                        makeComputerMove(newGameData)
                    }
                }, 100)
            }
        } else {
            newGameData[num] = "x";
            setGameData(newGameData);
            setCount(count + 1);
            checkWin(newGameData);
        }
    }


    const checkWin = (currentData = gameData) => {
        const winPatterns = getWinPatterns();

        for (let pattern of winPatterns) {
            const firstCell = currentData[pattern[0]];
            if (firstCell && pattern.every(index => currentData[index] === firstCell)) {
                won(firstCell);
                return;
            }
        }

        // Check for draw
        if (currentData.every(cell => cell !== "")) {
            setTitleText("It's a Draw!");
            setLock(true);
        }
    }

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            if (gameMode === '1player') {
                setTitleText("Computer Wins!");
            } else {
                setTitleText("Congratulations: X - You Won!");
            }
        } else {
            if (gameMode === '1player') {
                setTitleText("Congratulations! You Won!");
            } else {
                setTitleText("Congratulations: O - You Won!");
            }
        }
    }

    const reset = () => {
        setLock(false);
        const totalCells = gridSize * gridSize;
        setGameData(Array(totalCells).fill(""));
        setCount(0);
        setIsComputerThinking(false);
        setSelectedCell(0);
        setTitleText("Tic Tac Toe");
    }

    const backToMenu = () => {
        // Clear any pending computer moves
        setIsComputerThinking(false);
        setLock(false);
        
        // Reset state
        setCount(0);
        setSelectedCell(0);
        setGameData([]);
        
        // Reset mode and grid
        setGridSize(null);
        setGameMode(null);
    }

    const selectMode = (mode) => {
        setGameMode(mode);
    }

    const selectGridSize = (size) => {
        setGridSize(size);
        const totalCells = size * size;
        setGameData(Array(totalCells).fill(""));
        setCount(0);
        setLock(false);
    }

    // Mode Selection Screen
    if (!gameMode) {
        return (
            <>
                <Helmet>
                    <title>Arcade: TicTacToe</title>
                </Helmet>
                <div className='container-4 text-center'>
                    <h1 className='title-4 animate-title'>Tic Tac Toe</h1>
                    <div className="mode-selection animate-fade-in">
                        <h2 className="selection-title">Choose Your Game Mode</h2>
                        <button onClick={() => selectMode('1player')} className='tic-button mode-btn mode-btn-1'>
                            <span className="mode-icon">🤖</span>
                            <span className="mode-text">1 Player</span>
                            <span className="mode-subtitle">vs Computer</span>
                        </button>
                        <button onClick={() => selectMode('2player')} className='tic-button mode-btn mode-btn-2'>
                            <span className="mode-icon">👥</span>
                            <span className="mode-text">2 Players</span>
                            <span className="mode-subtitle">Local Multiplayer</span>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // Grid Size Selection Screen
    if (!gridSize) {
        return (
            <>
                <Helmet>
                    <title>Arcade: TicTacToe</title>
                </Helmet>
                <div className='container-4 text-center'>
                    <h1 className='title-4 animate-title'>Tic Tac Toe</h1>
                    <div className="mode-selection animate-fade-in">
                        <h2 className="selection-title">Choose Grid Size</h2>
                        <button onClick={() => selectGridSize(3)} className='tic-button mode-btn grid-btn'>
                            <span className="grid-icon">⊞</span>
                            <span className="mode-text">3×3 Grid</span>
                            <span className="mode-subtitle">Classic</span>
                        </button>
                        {gameMode === '1player' && (
                            <button onClick={() => selectGridSize(4)} className='tic-button mode-btn grid-btn'>
                                <span className="grid-icon">⊟</span>
                                <span className="mode-text">4×4 Grid</span>
                                <span className="mode-subtitle">Challenge</span>
                            </button>
                        )}
                        {gameMode === '2player' && (
                            <button onClick={() => selectGridSize(5)} className='tic-button mode-btn grid-btn'>
                                <span className="grid-icon">⊠</span>
                                <span className="mode-text">5×5 Grid</span>
                                <span className="mode-subtitle">Connect 4</span>
                            </button>
                        )}
                        <button onClick={backToMenu} className='tic-button back-btn'>
                            ← Back to Menu
                        </button>
                    </div>
                </div>
            </>
        );
    }


    return (
        <>
            <Helmet>
                <title>
                    Arcade: TicTacToe
                </title>
            </Helmet>
            <div className='container-4 text-center'>
                <h1 className='title-4 animate-title'>
                    {titleText}
                    {isComputerThinking && <span className="thinking-indicator">🤔</span>}
                </h1>
                <div className="game-info">
                    <span className="player-turn">
                        {!lock && !isComputerThinking && (
                            count % 2 === 0 ? "⭕ Your Turn" : gameMode === '1player' ? "❌ Computer's Turn" : "❌ Player 2's Turn"
                        )}
                    </span>
                </div>
                <div className="board animate-board" style={{
                    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
                    width: gridSize === 5 ? 'min(700px, 90vw)' : gridSize === 4 ? 'min(600px, 90vw)' : 'min(564px, 90vw)',
                    height: gridSize === 5 ? 'min(700px, 90vw)' : gridSize === 4 ? 'min(600px, 90vw)' : 'min(564px, 90vw)'
                }}>
                    {gameData.map((cellValue, index) => (
                        <div 
                            key={index}
                            className={`boxes ${index === selectedCell ? 'selected' : ''}`}
                            onClick={() => { toggle(null, index) }}
                        >
                            {cellValue === "o" && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="244" height="170" color="#DC7633" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                                </svg>
                            )}
                            {cellValue === "x" && (
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="234" height="180" color="#7B241C" fill="none">
                                    <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                    ))}
                </div>
                <div className="button-group">
                    <button onClick={() => { reset() }} className='tic-button reset-btn'>
                        🔄 New Game
                    </button>
                    <button onClick={backToMenu} className='tic-button back-btn'>
                        🏠 Main Menu
                    </button>
                </div>
            </div>

        </>
    )
}


export default TicTacToe