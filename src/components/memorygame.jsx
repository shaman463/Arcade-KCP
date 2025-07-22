import React from 'react'
import { useState, useEffect } from 'react'
import './Memorygame.css'
import SingleCard from './SingleCard'
import Navbar from './Navbar'
import { Helmet } from 'react-helmet'
import Footer from './Footer'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

const MemoryGame = () => {


  // AT first the cards are empty line no:26
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceone, setchoiceone] = useState(null)
  const [choicetwo, setchoicetwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle the cards
  // then the shufflecards function make cards a set of 2 cards
  // it shuffle all cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      // The sort method is fire for both the items in the array
      //IF we return number less than 0 then the order of the item remains the same and if we number is greater than 0 then order of both the item will be mixed up or swaped
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))


    setchoiceone(null)
    setchoicetwo(null)
    setCards(shuffledCards)
    //After this the cards are mapped in line: 93
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceone ? setchoicetwo(card) : setchoiceone(card)
  }

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
            else {
              return card
            }
          })
        })
        resetTurn()
      }
      else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceone, choicetwo])

  console.log(cards)


  // reset choices and increse turn
  const resetTurn = () => {
    setchoiceone(null)
    setchoicetwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(true)
    setDisabled(false)
  }

  // start the game automatically
  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <>
      <Navbar />
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
      <Footer/>
    </>
  )
}

export default MemoryGame