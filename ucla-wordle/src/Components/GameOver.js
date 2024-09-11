import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver(props) {
    const {
        board,
        setBoard,
        currAttempt,
        gameOver,
        setGameOver,
        onSelectLetter,
        correctWord,
        onDelete,
        results,
    } = useContext(AppContext);

    let name = "      UCLALE\n";

    let web = "\nfeatures.dailybruin.com/2024/reg-issue-2024/";

    return (props.trigger) ? (
        <div className="gameOver">
            <div className="inner">
                <div className="title">
                    {gameOver.guessedWord
                        ? "You Got It!"
                        : "Next Time!"}
                </div>
                <div>Correct Word: {correctWord}</div>
                {gameOver.guessedWord && (
                    <h3>You guessed in {currAttempt.attempt} attempts</h3>
                )}
                <div className='restart-btn' onClick={() => props.setTrigger()}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#D3D7C6"
                        alt='Play Again'>
                        <path d="M440-122q-121-15-200.5-105.5T160-440q0-66 26-126.5T260-672l57 57q-38 34-57.5 79T240-440q0 88 56 155.5T440-202v80Zm80 0v-80q87-16 143.5-83T720-440q0-100-70-170t-170-70h-3l44 44-56 56-140-140 140-140 56 56-44 44h3q134 0 227 93t93 227q0 121-79.5 211.5T520-122Z" />
                    </svg>
                </div>
                <div className='close-btn' onClick={() => props.setTrigger()}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#D3D7C6"
                        alt='Close'>
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
                </div>
                <div className="copy-btn" onClick={() => { window.navigator.clipboard.writeText(name.concat(results.toString().replace(/,/g, "")).concat(web))}}>Copy Results</div>
            </div>
        </div>
    ) : "";
}

export default GameOver;