import React, { useState, useEffect, useCallback, useContext } from "react";
import Button from "./Button";
import Food from "./Food";
import Menu from "../components/Menu";
import Snaker from "./Snaker";
import "./snake.css"; 
import { Helmet } from "react-helmet";
import { AuthContext } from "../context/AuthContext";
import { scoresAPI } from "../services/api";

const getRandomFood = () => { 
    let min = 1; 
    let max = 98; 
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2; 
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2; 
    return [x, y]; 
}; 

const initialState = { 
    food: getRandomFood(), 
    direction: "RIGHT", 
    speed: 100, 
    route: "menu", 
    snakeDots: [ 
        [0, 0], 
        [0, 2], 
    ],
    difficulty: "medium",
    isPaused: false,
    score: 0,
    highScore: parseInt(localStorage.getItem('snakeHighScore')) || 0,
    gameTime: 0,
    bestTime: parseInt(localStorage.getItem('snakeBestTime')) || 0,
    startTime: null,
}; 

const Snake = () => {
    const [gameState, setGameState] = useState(initialState);
    const { user, isAuthenticated } = useContext(AuthContext);

    const onKeyDown = useCallback((e) => { 
        e = e || window.event; 
        
        // Pause/Resume with Space or P
        if ((e.keyCode === 32 || e.keyCode === 80) && gameState.route === "game") {
            e.preventDefault();
            togglePause();
            return;
        }
        
        // Restart with R
        if (e.keyCode === 82 && gameState.route === "game") {
            e.preventDefault();
            restartGame();
            return;
        }
        
        // Arrow keys
        if (gameState.route === "game" && !gameState.isPaused) {
            e.preventDefault();
            
            setGameState(prevState => {
                switch (e.keyCode) { 
                    case 37: 
                        return prevState.direction !== "RIGHT" ? { ...prevState, direction: "LEFT" } : prevState;
                    case 38: 
                        return prevState.direction !== "DOWN" ? { ...prevState, direction: "UP" } : prevState;
                    case 39: 
                        return prevState.direction !== "LEFT" ? { ...prevState, direction: "RIGHT" } : prevState;
                    case 40: 
                        return prevState.direction !== "UP" ? { ...prevState, direction: "DOWN" } : prevState;
                    default:
                        return prevState;
                } 
            });
        }
    }, [gameState.route, gameState.isPaused]);

    const moveSnake = useCallback(() => { 
        setGameState(prevState => {
            if (prevState.route !== "game" || prevState.isPaused) return prevState;
            
            let dots = [...prevState.snakeDots]; 
            let head = dots[dots.length - 1]; 
            
            switch (prevState.direction) { 
                case "RIGHT": 
                    head = [head[0] + 2, head[1]]; 
                    break; 
                case "LEFT": 
                    head = [head[0] - 2, head[1]]; 
                    break; 
                case "DOWN": 
                    head = [head[0], head[1] + 2]; 
                    break; 
                case "UP": 
                    head = [head[0], head[1] - 2]; 
                    break; 
            } 
            dots.push(head); 
            dots.shift(); 
            
            return {
                ...prevState,
                snakeDots: dots
            };
        });
    }, []);

    const onSnakeOutOfBounds = useCallback(() => { 
        const head = gameState.snakeDots[gameState.snakeDots.length - 1]; 
        if (gameState.route === "game") { 
            if ( 
                head[0] >= 100 || 
                head[1] >= 100 || 
                head[0] < 0 || 
                head[1] < 0 
            ) { 
                gameOver(); 
            } 
        } 
    }, [gameState.snakeDots, gameState.route]);

    const onSnakeCollapsed = useCallback(() => { 
        let snake = [...gameState.snakeDots]; 
        let head = snake[snake.length - 1]; 
        snake.pop(); 
        snake.forEach((dot) => { 
            if (head[0] === dot[0] && head[1] === dot[1]) { 
                gameOver(); 
            } 
        }); 
    }, [gameState.snakeDots]);

    const onSnakeEats = useCallback(() => { 
        let head = gameState.snakeDots[gameState.snakeDots.length - 1]; 
        let food = gameState.food; 
        if (head[0] === food[0] && head[1] === food[1]) { 
            setGameState(prevState => ({
                ...prevState,
                food: getRandomFood(),
                score: prevState.score + 10
            }));
            increaseSnake(); 
        } 
    }, [gameState.snakeDots, gameState.food]);

    const increaseSnake = () => { 
        setGameState(prevState => {
            let newSnake = [...prevState.snakeDots]; 
            newSnake.unshift([]); 
            newSnake.unshift([]); 
            return {
                ...prevState,
                snakeDots: newSnake 
            };
        });
    }; 

    // const increaseSpeed = () => { 
    //     setGameState(prevState => {
    //         if (prevState.speed > 10) { 
    //             return {
    //                 ...prevState,
    //                 speed: prevState.speed - 5
    //             };
    //         }
    //         return prevState;
    //     });
    // }; 

    const onRouteChange = (difficulty = "medium") => {
        const speedMap = {
            easy: 100,
            medium: 80,
            hard: 60
        };
        
        setGameState(prevState => ({
            ...initialState,
            route: "game",
            difficulty: difficulty,
            speed: speedMap[difficulty],
            highScore: prevState.highScore,
            bestTime: prevState.bestTime,
            startTime: Date.now(),
            gameTime: 0
        }));
    };
    
    const togglePause = () => {
        setGameState(prevState => ({
            ...prevState,
            isPaused: !prevState.isPaused
        }));
    };
    
    const restartGame = () => {
        const speedMap = {
            easy: 150,
            medium: 100,
            hard: 60
        };
        
        setGameState(prevState => {
            const currentDifficulty = prevState.difficulty || "medium";
            return {
                ...initialState,
                route: "game",
                difficulty: currentDifficulty,
                speed: speedMap[currentDifficulty],
                highScore: prevState.highScore,
                bestTime: prevState.bestTime,
                startTime: Date.now(),
                gameTime: 0
            };
        });
    };
    
    const backToMenu = () => {
        setGameState(prevState => ({
            ...initialState,
            highScore: prevState.highScore,
            bestTime: prevState.bestTime
        }));
    }; 

    const gameOver = () => {
        const finalScore = gameState.score;
        const finalTime = gameState.gameTime;
        const newHighScore = Math.max(finalScore, gameState.highScore);
        const newBestTime = Math.max(finalTime, gameState.bestTime);
        
        if (finalScore > gameState.highScore) {
            localStorage.setItem('snakeHighScore', newHighScore);
        }
        
        if (finalTime > gameState.bestTime) {
            localStorage.setItem('snakeBestTime', newBestTime);
        }
        
        // Save score to backend for authenticated users (not guests)
        if (isAuthenticated && user && !user.isGuest) {
            try {
                scoresAPI.saveScore('snake', finalScore, {
                    time: finalTime,
                    difficulty: gameState.difficulty,
                    timestamp: new Date().toISOString()
                }).catch(err => {
                    console.error('Failed to save score to database:', err);
                });
            } catch (err) {
                console.error('Error saving score:', err);
            }
        }
        
        setGameState(prevState => ({
            ...initialState,
            route: "gameover",
            score: finalScore,
            highScore: newHighScore,
            difficulty: prevState.difficulty,
            speed: prevState.speed,
            gameTime: finalTime,
            bestTime: newBestTime
        }));
    }; 

    const onDown = () => { 
        setGameState(prevState => {
            if (prevState.route !== "game") return prevState;
            
            let dots = [...prevState.snakeDots]; 
            let head = dots[dots.length - 1]; 

            head = [head[0], head[1] + 2]; 
            dots.push(head); 
            dots.shift(); 
            return {
                ...prevState,
                direction: "DOWN", 
                snakeDots: dots
            };
        });
    }; 

    const onUp = () => { 
        setGameState(prevState => {
            if (prevState.route !== "game") return prevState;
            
            let dots = [...prevState.snakeDots]; 
            let head = dots[dots.length - 1]; 

            head = [head[0], head[1] - 2]; 
            dots.push(head); 
            dots.shift(); 
            return {
                ...prevState,
                direction: "UP", 
                snakeDots: dots
            };
        });
    }; 

    const onRight = () => { 
        setGameState(prevState => {
            if (prevState.route !== "game") return prevState;
            
            let dots = [...prevState.snakeDots]; 
            let head = dots[dots.length - 1]; 

            head = [head[0] + 2, head[1]]; 
            dots.push(head); 
            dots.shift(); 
            return {
                ...prevState,
                direction: "RIGHT", 
                snakeDots: dots
            };
        });
    }; 

    const onLeft = () => { 
        setGameState(prevState => {
            if (prevState.route !== "game") return prevState;
            
            let dots = [...prevState.snakeDots]; 
            let head = dots[dots.length - 1]; 

            head = [head[0] - 2, head[1]]; 
            dots.push(head); 
            dots.shift(); 
            return {
                ...prevState,
                direction: "LEFT", 
                snakeDots: dots
            };
        });
    }; 

    // useEffect for game interval and cleanup
    useEffect(() => {
        let gameInterval;
        
        if (gameState.route === "game" && !gameState.isPaused) {
            gameInterval = setInterval(moveSnake, gameState.speed);
        }
        
        return () => {
            if (gameInterval) {
                clearInterval(gameInterval);
            }
        };
    }, [gameState.route, gameState.speed, gameState.isPaused, moveSnake]);

    // useEffect for keyboard event listeners
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [onKeyDown]);

    // useEffect for game logic checks
    useEffect(() => {
        if (gameState.route === "game") {
            onSnakeOutOfBounds();
            onSnakeCollapsed();
            onSnakeEats();
        }
    }, [gameState.snakeDots, gameState.route, onSnakeOutOfBounds, onSnakeCollapsed, onSnakeEats]);

    // useEffect for timer
    useEffect(() => {
        let timerInterval;
        
        if (gameState.route === "game" && !gameState.isPaused && gameState.startTime) {
            timerInterval = setInterval(() => {
                setGameState(prevState => ({
                    ...prevState,
                    gameTime: Math.floor((Date.now() - prevState.startTime) / 1000)
                }));
            }, 1000);
        }
        
        return () => {
            if (timerInterval) {
                clearInterval(timerInterval);
            }
        };
    }, [gameState.route, gameState.isPaused, gameState.startTime]);

    const { route, snakeDots, food, score, highScore, isPaused, difficulty, gameTime, bestTime } = gameState;
    
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }; 
    return ( 
        <>
        <Helmet>
            <title>
                Arcade: Snake Game
            </title>
        </Helmet>
        <div className="snake-container"> 
            {route === "menu" ? ( 
                <div className="menu-wrapper">
                    <h1 className="snake-title">🐍 Snake Game</h1>
                    <div className="high-score-display">
                        🏆 High Score: {highScore}
                    </div>
                    {bestTime > 0 && (
                        <div className="best-time-display">
                            ⏱️ Best Time: {formatTime(bestTime)}
                        </div>
                    )}
                    <div className="difficulty-selection">
                        <h2>Choose Difficulty</h2>
                        <div className="difficulty-buttons">
                            <button 
                                className="difficulty-btn easy"
                                onClick={() => onRouteChange("easy")}
                            >
                                🟢 Easy<br/><span>Slow Speed</span>
                            </button>
                            <button 
                                className="difficulty-btn medium"
                                onClick={() => onRouteChange("medium")}
                            >
                                🟡 Medium<br/><span>Normal Speed</span>
                            </button>
                            <button 
                                className="difficulty-btn hard"
                                onClick={() => onRouteChange("hard")}
                            >
                                🔴 Hard<br/><span>Fast Speed</span>
                            </button>
                        </div>
                    </div>
                    <div className="game-instructions">
                        <p>🎮 Use Arrow Keys or On-Screen Buttons</p>
                        <p>⏸️ Press SPACE or P to Pause</p>
                        <p>🔄 Press R to Restart</p>
                    </div>
                </div>
            ) : route === "gameover" ? (
                <div className="gameover-modal">
                    <div className="gameover-content">
                        <h1 className="gameover-title">Game Over!</h1>
                        <div className="gameover-stats">
                            <div className="stat-item">
                                <span className="stat-label">Final Score</span>
                                <span className="stat-value">{score}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">High Score</span>
                                <span className="stat-value gold">{highScore}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Time Survived</span>
                                <span className="stat-value">{formatTime(gameTime)}</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-label">Best Time</span>
                                <span className="stat-value gold">{formatTime(bestTime)}</span>
                            </div>
                            {score === highScore && score > 0 && (
                                <div className="new-record">🎉 New High Score! 🎉</div>
                            )}
                            {gameTime === bestTime && gameTime > 0 && (
                                <div className="new-record">⏱️ New Best Time! ⏱️</div>
                            )}
                        </div>
                        <div className="gameover-buttons">
                            <button className="play-again-btn" onClick={restartGame}>
                                🔄 Play Again
                            </button>
                            <button className="menu-btn" onClick={backToMenu}>
                                🏠 Main Menu
                            </button>
                        </div>
                    </div>
                </div>
            ) : ( 
                <div className="game-wrapper"> 
                    <div className="game-header">
                        <div className="game-stats">
                            <div className="stat-box">
                                <span className="stat-label-small">Score</span>
                                <span className="stat-value-small">{score}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label-small">High Score</span>
                                <span className="stat-value-small gold-text">{highScore}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label-small">Time</span>
                                <span className="stat-value-small">{formatTime(gameTime)}</span>
                            </div>
                            <div className="stat-box">
                                <span className="stat-label-small">Length</span>
                                <span className="stat-value-small">{snakeDots.length}</span>
                            </div>
                        </div>
                        <div className="game-controls">
                            <button className="control-btn" onClick={togglePause}>
                                {isPaused ? "▶️ Resume" : "⏸️ Pause"}
                            </button>
                            <button className="control-btn" onClick={restartGame}>
                                🔄 Restart
                            </button>
                            <button className="control-btn" onClick={backToMenu}>
                                🏠 Menu
                            </button>
                        </div>
                    </div>
                    
                    <div className="game-area"> 
                        <Snaker snakeDots={snakeDots} /> 
                        <Food dot={food} />
                        {isPaused && (
                            <div className="pause-overlay">
                                <div className="pause-content">
                                    <h2>⏸️ PAUSED</h2>
                                    <p>Press SPACE or P to continue</p>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <Button 
                        onDown={onDown} 
                        onLeft={onLeft} 
                        onRight={onRight} 
                        onUp={onUp} 
                    /> 
                </div> 
            )} 
        </div>
        </>
    ); 
}; 

export default Snake; 
