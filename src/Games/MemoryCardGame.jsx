import React, { useState, useEffect, useCallback } from 'react'
import './MemoryCardGame.css'
import SingleCard from './SingleCard'
import { Helmet } from 'react-helmet'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

const MemoryCardGame = () => {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceone, setchoiceone] = useState(null)
  const [choicetwo, setchoicetwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle the cards
  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setchoiceone(null)
    setchoicetwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }, []);

  // handle a choice
  const handleChoice = useCallback((card) => {
    if (disabled) return;
    
    if (choiceone) {
      if (choiceone.id !== card.id) {
        setchoicetwo(card);
      }
    } else {
      setchoiceone(card);
    }
  }, [choiceone, disabled]);

  // reset choices and increase turn
  const resetTurn = useCallback(() => {
    setchoiceone(null)
    setchoicetwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }, []);

  // compare 2 selected cards
  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true)
      
      if (choiceone.src === choicetwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true }
            }
            return card
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceone, choicetwo, resetTurn])

  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setTimeout(() => {
        alert(`Congratulations! You won in ${turns} turns!`);
      }, 500);
    }
  }, [cards, turns]);

  // start the game automatically
  useEffect(() => {
    shuffleCards()
  }, [shuffleCards])


  return (
    <>
      <Helmet>
        <title>Arcade:  Memory Game</title>
      </Helmet>
      <div className="app m-40 mx-w-4xl">
        <h1 className='title-1'>Magic Match</h1>
        <button onClick={shuffleCards} className="button-1 bg-blue-600 text-white rounded-xl cursor-pointer py-3 px-6 bg-none hover:bg-sky-700 hover:text-white ">New game</button>


        <p className='turn-1'> Turns: {turns}</p>


        <div className="card-grid">
          {cards.map(card => (

            <SingleCard
              handleChoice={handleChoice}
              key={card.id}
              card={card}
              flipped={card === choiceone || card === choicetwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default MemoryCardGame