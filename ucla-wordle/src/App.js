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
        <p className="instructions"><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -1260 1260 960" width="40px" fill="#E7C1FF"><path d="M186.67-120q-27.67 0-47.17-19.5T120-186.67v-586.66q0-27.67 19.5-47.17t47.17-19.5h586.66q27.67 0 47.17 19.5t19.5 47.17v586.66q0 27.67-19.5 47.17T773.33-120H186.67Z" className="square"/></svg> = Correct letter, correct position <br/>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -1260 1260 960" width="40px" fill="#FFD4AC"><path d="M186.67-120q-27.67 0-47.17-19.5T120-186.67v-586.66q0-27.67 19.5-47.17t47.17-19.5h586.66q27.67 0 47.17 19.5t19.5 47.17v586.66q0 27.67-19.5 47.17T773.33-120H186.67Z"/></svg> = Correct letter, incorrect position <br/>
        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -1260 1260 960" width="40px" fill="#CDCDCD"><path d="M186.67-120q-27.67 0-47.17-19.5T120-186.67v-586.66q0-27.67 19.5-47.17t47.17-19.5h586.66q27.67 0 47.17 19.5t19.5 47.17v586.66q0 27.67-19.5 47.17T773.33-120H186.67Z"/></svg> = Incorrect letter <br/>
        </p>
        <GameOver trigger={gameOver.gameOver} setTrigger={startGame}/>
      </AppContext.Provider>
      </div>
    </div>
  );
}

export default App;