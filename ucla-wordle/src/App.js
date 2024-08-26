import './App.css';
import React, { useEffect } from 'react';
import { createContext, useState } from 'react';
import Board from './Components/Board';
import Keyboard from './Components/Keyboard';
import { boardDefault, generateWord } from './Components/Words';
import GameOver from './Components/GameOver';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = React.useState(boardDefault);
  const [attempt, setAttempt] = React.useState({ att: 0, pos: 0 });
  const [disabledLetters, setDisabledLetters] = React.useState([]);
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [wordset, setWordset] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  // const [wordbank, setWordbank] = useState([
  //   "Moore",
  //   "Holly",
  //   "Bruin",
  //   "Boyer",
  //   "Broad",
  //   "Covel",
  //   "Franz",
  //   "Rolfe",
  //   "Royce",
  //   "Young",
  //   "Frenk",
  //   "Fours",
  //   "Josie",
  //   "Class",
  //   "Major",
  //   "Study",
  //   "Grade",
  //   "Final",
  //   "Drake",
  //   "Hitch",
  //   "Saxon",
  //   "Undie",
  //   "Rover",
  //   "Block",
  //   "Movie",
  //   "Cedar",
  //   "Union",
  //   "Ophir",
  //   "Conte",
// ]);

  useEffect(() => {
    generateWord().then((words) => {
      setWordset(words.wordset);
      setCorrectWord(words.word);
    });
  }, []);

  const onSelectLetter = (key) => {
    if (attempt.pos > 4) return;
    const newBoard = [...board];
    newBoard[attempt.att][attempt.pos] = key;
    setBoard(newBoard);
    setAttempt({ ...attempt, pos: attempt.pos + 1 });
  }

  const onDelete = () => {
    if (attempt.pos === 0) return;
    const newBoard = [...board];
    newBoard[attempt.att][attempt.pos - 1] = "";
    setBoard(newBoard);
    setAttempt({ ...attempt, pos: attempt.pos - 1 });
  }

  const onEnter = () => {
    if (attempt.pos !== 5) return;
    setAttempt({ att: attempt.att + 1, pos: 0 })

    let word = "";
    for (let i = 0; i < 5; i++) {
      word += board[attempt.att][i];
    }

    if (word === correctWord) {
      setGameOver({gameOver: true, guessedWord: true});
    }

    if (attempt.att === 5) {
      setGameOver({gameOver: true, guessedWord: false});
    }
  }

  return (
    <div className="App">
      <h1>UCLA Wordle</h1>
      <AppContext.Provider value={{ board, setBoard, attempt, setAttempt, onSelectLetter, onEnter, onDelete, disabledLetters, setDisabledLetters, gameOver, setGameOver, correctWord }}>
        <div className="game">
          <Board />
          { gameOver.gameOver ? <GameOver /> : <Keyboard /> }
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
