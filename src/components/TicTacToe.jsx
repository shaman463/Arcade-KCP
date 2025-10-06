import React, { useRef, useEffect } from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import './TicTacToe.css'
import Footer from './Footer'

const TicTacToe = () => {
    const [gameData, setGameData] = useState(Array(9).fill(""))
    const [count, setCount] = useState(0)
    const [lock, setLock] = useState(false)
    const [selectedCell, setSelectedCell] = useState(0) // For keyboard navigation

    let titleRef = useRef(null)
    let box1 = useRef(null)
    let box2 = useRef(null)
    let box3 = useRef(null)
    let box4 = useRef(null)
    let box5 = useRef(null)
    let box6 = useRef(null)
    let box7 = useRef(null)
    let box8 = useRef(null)
    let box9 = useRef(null)

    let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9]

    // Keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (lock) return;
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    setSelectedCell(prev => (prev + 1) % 9);
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    setSelectedCell(prev => (prev - 1 + 9) % 9);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedCell(prev => (prev + 3) % 9);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedCell(prev => (prev - 3 + 9) % 9);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    if (box_array[selectedCell].current) {
                        const event = { target: box_array[selectedCell].current };
                        toggle(event, selectedCell);
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
    }, [lock, selectedCell]);

    // Update visual focus
    useEffect(() => {
        box_array.forEach((box, index) => {
            if (box.current) {
                if (index === selectedCell) {
                    box.current.style.border = '4px solid #00ff00';
                    box.current.style.boxShadow = '0 0 10px #00ff00';
                } else {
                    box.current.style.border = '4px solid #0f1b21';
                    box.current.style.boxShadow = 'none';
                }
            }
        });
    }, [selectedCell]);

    const toggle = (e, num) => {
        if (lock || gameData[num] !== "") {
            return;
        }
        
        const newGameData = [...gameData];
        
        if (count % 2 === 0) {
            e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="244" height="170" color="#DC7633" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        </svg>`;
            newGameData[num] = "o";
        } else {
            e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="234" height="180" color="#7B241C" fill="none">
            <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;
            newGameData[num] = "x";
        }
        
        setGameData(newGameData);
        setCount(count + 1);
        checkWin(newGameData);
    }


    const checkWin = (currentData = gameData) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[a] === currentData[c]) {
                won(currentData[a]);
                return;
            }
        }

        // Check for draw
        if (currentData.every(cell => cell !== "")) {
            titleRef.current.innerHTML = "It's a Draw!";
            setLock(true);
        }
    }

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = "Congratulations: X - You Won!";
        } else {
            titleRef.current.innerHTML = "Congratulations: O - You Won!";
        }
    }

    const reset = () => {
        setLock(false);
        setGameData(Array(9).fill(""));
        setCount(0);
        titleRef.current.innerHTML = "Tic Tac Toe";
        box_array.forEach((boxRef) => {
            if (boxRef.current) {
                boxRef.current.innerHTML = "";
            }
        });
    }


    return (
        <>
            <Navbar />
            <Helmet>
                <title>
                    Arcade: TicTacToe
                </title>
            </Helmet>
            <div className='container-4 text-center'>
                <h1 ref={titleRef} className='title-4'>Tic Tac Toe </h1>
                <div className="board">
                    <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                    <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                    <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                    <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                    <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                    <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                    <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                    <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                    <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                </div>
                <button onClick={() => { reset() }} className='tic-button'>New Game</button>
            </div>
            <Footer />
        </>
    )
}


export default TicTacToe