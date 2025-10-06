import React, { useState, useEffect, useCallback } from "react";
import Button from "./Button";
import Food from "./Food";
import Menu from "./Menu";
import Snaker from "./Snaker";
import "./snake.css"; 
import Navbar from "./Navbar";
import { Helmet } from "react-helmet";
import Footer from "./Footer";

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
}; 

const Snake = () => {
    const [gameState, setGameState] = useState(initialState);

    const onKeyDown = useCallback((e) => { 
        e.preventDefault(); 
        e = e || window.event; 
        
        setGameState(prevState => {
            if (prevState.route !== "game") return prevState;
            
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
    }, []);

    const moveSnake = useCallback(() => { 
        setGameState(prevState => {
            if (prevState.route !== "game") return prevState;
            
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
                food: getRandomFood()
            }));
            increaseSnake(); 
            increaseSpeed(); 
        } 
    }, [gameState.snakeDots, gameState.food]);

    const increaseSnake = () => { 
        setGameState(prevState => {
            let newSnake = [...prevState.snakeDots]; 
            newSnake.unshift([]); 
            return {
                ...prevState,
                snakeDots: newSnake
            };
        });
    }; 

    const increaseSpeed = () => { 
        setGameState(prevState => {
            if (prevState.speed > 10) { 
                return {
                    ...prevState,
                    speed: prevState.speed - 20
                };
            }
            return prevState;
        });
    }; 

    const onRouteChange = () => { 
        setGameState(prevState => ({
            ...prevState,
            route: "game"
        }));
    }; 

    const gameOver = () => { 
        alert(`GAME OVER, your score is ${gameState.snakeDots.length - 2}`); 
        setGameState(initialState); 
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
        
        if (gameState.route === "game") {
            gameInterval = setInterval(moveSnake, gameState.speed);
        }
        
        return () => {
            if (gameInterval) {
                clearInterval(gameInterval);
            }
        };
    }, [gameState.route, gameState.speed, moveSnake]);

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

    const { route, snakeDots, food } = gameState; 
    return ( 
        <>
        <Navbar/>
        <Helmet>
            <title>
                Arcade: Snake Game
            </title>
        </Helmet>
        <div className="snake-container"> 
            {route === "menu" ? ( 
                <div> 
                    <Menu onRouteChange={onRouteChange} /> 
                </div> 
            ) : ( 
                <div> 
                    <div className="game-area"> 
                        <Snaker snakeDots={snakeDots} /> 
                        <Food dot={food} /> 
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
        <Footer/>
        </>
    ); 
}; 

export default Snake; 
