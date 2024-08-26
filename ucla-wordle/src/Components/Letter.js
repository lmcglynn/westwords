import React from 'react'
import { useContext, useEffect } from 'react';
import { AppContext } from '../App';

function Letter({ position, attemptVal }) {
    const { board, attempt, setDisabledLetters, correctWord } = useContext(AppContext);
    const letter = board[attemptVal][position];

    const correct = correctWord[position] === letter;
    const almost = !correct && letter !== "" && correctWord.includes(letter);

    const letterState = attempt.att > attemptVal && (correct ? "correct" : almost ? "almost" : "error");

    useEffect(() => {
        if (letter !== "" && !correct && !almost ) {
            setDisabledLetters((stateBoi) => [...stateBoi, letter]);
        }
    }, [attempt.att]);

    return (
        <div className='letter' id={letterState}>{letter}</div>
    )
}


export default Letter