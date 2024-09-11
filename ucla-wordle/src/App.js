import "./App.css";
import Board from "./Components/Board";
import Keyboard from "./Components/Keyboard";
import { boardDefault, generateWordSet } from "./Words";
import React, { useState, createContext, useEffect } from "react";
import GameOver from "./Components/GameOver";

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letter: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [correctWord, setCorrectWord] = useState("");
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [results, setResults] = useState([
    ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
    ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
    ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
    ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
    ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
    ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
  ]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      startGame();
    });
  }, []);

  const startGame = () => {
    setBoard([
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ]);
    setCurrAttempt({ attempt: 0, letter: 0 });
    setDisabledLetters([]);
    setGameOver({ gameOver: false, guessedWord: false });
    generateWordSet().then((words) => {
      setCorrectWord(words.theWord);
      // console.log(words.theWord);
    });
    setResults([
      ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
      ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
      ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
      ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
      ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
      ["⬛", "⬛", "⬛", "⬛", "⬛", "\n"],
    ]);
  };

  const onEnter = () => {
    if (currAttempt.letter !== 5) return;

    let newResults = results;

    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
      if (board[currAttempt.attempt][i] === correctWord[i]) {
        newResults[currAttempt.attempt][i] = "🟩";
      } else if (correctWord.includes(board[currAttempt.attempt][i])) {
        newResults[currAttempt.attempt][i] = "🟨";
      }
    }

    setResults(newResults);
    
    setCurrAttempt({ attempt: currAttempt.attempt + 1, letter: 0 });
    

    if (currWord === correctWord) {
      setGameOver({ gameOver: true, guessedWord: true });
      return;
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
      return;
    }
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({
      attempt: currAttempt.attempt,
      letter: currAttempt.letter + 1,
    });
  };

  return (
    <div className="App">
      <div className="background">
        <h1>UCLALE</h1>
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          results,
          setResults,
        }}
      >
        <div className="game">
          <Board />
          <Keyboard />
        </div>
        <GameOver trigger={gameOver.gameOver} setTrigger={startGame}/>
      </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;