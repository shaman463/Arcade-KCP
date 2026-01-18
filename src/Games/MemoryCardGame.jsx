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
  const [turnsLeft, setTurnsLeft] = useState(5)
  const [choiceone, setchoiceone] = useState(null)
  const [choicetwo, setchoicetwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'won', 'lost'
  const [score, setScore] = useState(0)

  // shuffle the cards
  const shuffleCards = useCallback(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setchoiceone(null)
    setchoicetwo(null)
    setCards(shuffledCards)
    setTurnsLeft(5)
    setGameStatus('playing')
    setScore(0)
    setDisabled(false)
  }, []);

  // handle a choice
  const handleChoice = useCallback((card) => {
    if (disabled || gameStatus !== 'playing') return;
    
    if (choiceone) {
      if (choiceone.id !== card.id) {
        setchoicetwo(card);
      }
    } else {
      setchoiceone(card);
    }
  }, [choiceone, disabled, gameStatus]);

  // reset choices and decrease turn for wrong matches
  const resetTurn = useCallback((isMatch) => {
    setchoiceone(null)
    setchoicetwo(null)
    
    if (!isMatch) {
      setTurnsLeft(prevTurns => {
        const newTurns = prevTurns - 1;
        if (newTurns <= 0) {
          setGameStatus('lost');
        }
        return newTurns;
      });
    } else {
      setScore(prevScore => prevScore + 10);
    }
    
    setDisabled(false)
  }, []);

  // compare 2 selected cards
  useEffect(() => {
    if (choiceone && choicetwo) {
      setDisabled(true)
      
      if (choiceone.src === choicetwo.src) {
        // Match found
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceone.src) {
              return { ...card, matched: true }
            }
            return card
          })
        })
        setTimeout(() => resetTurn(true), 500)
      } else {
        // No match
        setTimeout(() => resetTurn(false), 1000)
      }
    }
  }, [choiceone, choicetwo, resetTurn])

  // Check for win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched) && gameStatus === 'playing') {
      setTimeout(() => {
        setGameStatus('won');
      }, 500);
    }
  }, [cards, gameStatus]);

  // start the game automatically
  useEffect(() => {
    shuffleCards()
  }, [shuffleCards])


  return (
    <>
      <Helmet>
        <title>Arcade: Memory Game</title>
      </Helmet>
      <div className="memory-game-container">
        <div className="memory-game-content">
          <h1 className='memory-title'>🧠 Magic Match</h1>
          
          {/* Game Stats */}
          <div className="game-stats">
            <div className="stat-card">
              <span className="stat-label">Turns Left</span>
              <span className={`stat-value ${turnsLeft <= 2 ? 'warning' : ''}`}>
                {turnsLeft}
              </span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Score</span>
              <span className="stat-value">{score}</span>
            </div>
          </div>

          {/* Game Status Messages */}
          {gameStatus === 'won' && (
            <div className="game-message win-message">
              <h2>🎉 Congratulations!</h2>
              <p>You found all matches!</p>
              <p className="final-score">Final Score: {score}</p>
              <button onClick={shuffleCards} className="play-again-btn">
                Play Again
              </button>
            </div>
          )}

          {gameStatus === 'lost' && (
            <div className="game-message lose-message">
              <h2>😢 Game Over!</h2>
              <p>You ran out of turns!</p>
              <p className="final-score">Score: {score}</p>
              <button onClick={shuffleCards} className="play-again-btn">
                Try Again
              </button>
            </div>
          )}

          {/* New Game Button */}
          {gameStatus === 'playing' && (
            <button onClick={shuffleCards} className="new-game-btn">
              🔄 New Game
            </button>
          )}

          {/* Card Grid */}
          <div className={`card-grid ${gameStatus !== 'playing' ? 'game-over' : ''}`}>
            {cards.map(card => (
              <SingleCard
                handleChoice={handleChoice}
                key={card.id}
                card={card}
                flipped={card === choiceone || card === choicetwo || card.matched}
                disabled={disabled || gameStatus !== 'playing'}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default MemoryCardGame