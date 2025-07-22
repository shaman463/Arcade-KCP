import React, { useRef } from 'react'
import circle from '../assets/circle.png'
import cross from '../assets/cross.png'
import { useState } from 'react'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import './TicTacToe.css'
import Footer from './Footer'


let data = ["", "", "", "", "", "", "", "", "",]

const TicTacToe = () => {

    const [count, setCount] = useState(0)
    const [lock, setLock] = useState(false)

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

    const toggle = (e, num) => {
        if (lock) {
            return 0;
        }
        if (count % 2 === 0) {
            e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="244" height="170" color="#DC7633 
            " fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
        </svg>` ;
            data[num] = "o";
            setCount(1 + count);
        }
        else {
            e.target.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="234" height="180" color="#7B241C" fill="none">
            <path d="M19.0005 4.99988L5.00045 18.9999M5.00045 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>`;
            data[num] = "x";
            setCount(1 + count);
        }
        checkWin()
    }


    const checkWin = () => {
        if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2])
        }
        else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
            won(data[5])
        }
        else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
            won(data[8])
        }
        else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
            won(data[6])
        }
        else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
            won(data[7])
        }
        else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
            won(data[8])
        }
        else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
            
            won(data[8])
        }
        else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
            won(data[2])
        }
        else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
            won(data[6])
        }
    }

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = `congratulations: X - you won `

        }
        else {
            titleRef.current.innerHTML = `congratulations: O - you won `

        }
    }

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", "",]
        titleRef.current.innerHTML = `Tic Tac Toe `
        box_array.map((e) => {
            e.current.innerHTML = "";
        })
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
               
                    <div className="row1">
                        <div className="boxes" ref={box1} onClick={(e) => { toggle(e, 0) }}></div>
                        <div className="boxes" ref={box2} onClick={(e) => { toggle(e, 1) }}></div>
                        <div className="boxes" ref={box3} onClick={(e) => { toggle(e, 2) }}></div>
                    </div>
                    <div className="row2">
                        <div className="boxes" ref={box4} onClick={(e) => { toggle(e, 3) }}></div>
                        <div className="boxes" ref={box5} onClick={(e) => { toggle(e, 4) }}></div>
                        <div className="boxes" ref={box6} onClick={(e) => { toggle(e, 5) }}></div>
                    </div>
                    <div className="row3">
                        <div className="boxes" ref={box7} onClick={(e) => { toggle(e, 6) }}></div>
                        <div className="boxes" ref={box8} onClick={(e) => { toggle(e, 7) }}></div>
                        <div className="boxes" ref={box9} onClick={(e) => { toggle(e, 8) }}></div>
                    </div>
                </div>
                <button onClick={() => { reset() }} className='tic-button'>New Game</button>
            </div>
            <Footer />
        </>
    )
}


export default TicTacToe