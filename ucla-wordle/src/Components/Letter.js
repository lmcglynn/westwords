import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ letterPos, attemptVal }) {
    const { board, setDisabledLetters, disabledLetters, currAttempt, correctWord, setResults, results } =
        useContext(AppContext);
    const letter = board[attemptVal][letterPos];
    const correct = correctWord.toUpperCase()[letterPos] === letter;
    let Capps = []; // correct appearances
    let Gapps = []; // guessed appearances
    let almost = false;
    let exception = false;
    if (correctWord.toUpperCase().includes(letter) && !correct) {
        exception = true;
        for (let i = 0; i < 5; i++) {
            if (correctWord[i] === letter && board[attemptVal][i] !== letter) {
                Capps.push(i);
            }
            if (board[attemptVal][i] === letter && correctWord[i] !== letter) {
                Gapps.push(i);
            }
        }
        if (Capps.length === 0) {
            almost = false;
        }
        else if (Capps.length >= Gapps.length) {
            almost = true;
        }
        else if (Gapps.length === 1) {
            almost = true;
        }
        else if (Gapps.length - Capps.length >= 1) {
            if (Gapps[Gapps.length - (Gapps.length-Capps.length) - 1] >= letterPos) {
                almost = true;
            }
        }
    }
    // const almost =
        // !correct && letter !== "" && correctWord.toUpperCase().includes(letter);
    const letterState =
        currAttempt.attempt > attemptVal &&
        (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
        if (letter !== "" && !correct && !almost && !exception && !disabledLetters.includes(letter)) {
            setDisabledLetters((prev) => [...prev, letter]);
        }
    }, [currAttempt.attempt]);
    return (
        <div className="letter" id={letterState}>
            {letter}
        </div>
    );
}

export default Letter;