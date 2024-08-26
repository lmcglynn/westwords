import { React, useContext } from 'react'
import { AppContext } from '../App'

function GameOver() {
    const { gameOver, setGameOver, correctWord, attempt } = useContext(AppContext);
  return (
    <div className='gameOver'>
        <h3>
            {gameOver.guessedWord ? "You Got It!" : "You Failed"}
        </h3>
        <h1>
            Correct: {correctWord}
        </h1>
        {gameOver.guessedWord && (<h3> You guessed in {attempt.att} attempts</h3>)}
    </div>
  )
}

export default GameOver