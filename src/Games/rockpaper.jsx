import "./rockpaper.css";
import { FaHandRock, FaHandPaper, FaHandScissors} from "react-icons/fa";
import { useState } from "react";
import { Helmet } from "react-helmet";

const actions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
};

function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);

  return keys[index];
}

function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  // This should never really happen
  return null;
}

function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}

function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className="score">{`${name}: ${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  const actionLabels = {
    rock: "Rock",
    paper: "Paper", 
    scissors: "Scissors",
  };

  return (
    <button 
      className="round-btn-1" 
      onClick={() => onActionSelected(action)}
      aria-label={`Choose ${actionLabels[action]}`}
      title={`Select ${actionLabels[action]}`}
    >
      <ActionIcon action={action} size={60} />
    </button>
  );
}

function ShowWinner({ winner = 0 }) {
  const text = {
    "-1": "🎉 You Win!",
    0: "🤝 It's a Tie",
    1: "💻 Computer Wins!",
  };

  const winnerClass = {
    "-1": "winner-1 winner-player",
    0: "winner-1 winner-tie",
    1: "winner-1 winner-computer",
  };

  return (
    <h2 className={winnerClass[winner]}>{text[winner]}</h2>
  )
}

const Rockpaper = () => {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");

  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);

  const onActionSelected = (selectedAction) => {
    const newComputerAction = randomAction();

    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);
    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  const resetGame = () => {
    setPlayerAction("");
    setComputerAction("");
    setPlayerScore(0);
    setComputerScore(0);
    setWinner(0);
  };

  return (
    <>
      <Helmet>
        <title>
          Arcade: Rock Paper scissors
        </title>
      </Helmet>
      <div className="center-2">
        <div className="game-wrapper-rps">
          <h1 className="title-2">✊✋✌️ Rock Paper Scissors</h1>
          <div className="game-content-rps">
            <div className="container-2">
              <Player name="Player" score={playerScore} action={playerAction} />
              <div className="vs-divider">VS</div>
              <Player
                name="Computer"
                score={computerScore}
                action={computerAction}
              />
            </div>
            <ShowWinner winner={winner} />
            <div className="actions-container">
              <ActionButton action="rock" onActionSelected={onActionSelected} />
              <ActionButton action="paper" onActionSelected={onActionSelected} />
              <ActionButton action="scissors" onActionSelected={onActionSelected} />
            </div>
            <button className="reset-btn-rps" onClick={resetGame}>
              🔄 Reset Game
            </button>
          </div>
        </div>
      </div>
    </>

  );
}

export default Rockpaper;