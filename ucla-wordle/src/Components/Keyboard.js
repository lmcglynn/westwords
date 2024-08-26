import { React, useCallback, useContext, useEffect } from 'react'
import Key from './Key';
import { AppContext } from '../App';

function Keyboard() {
    const { board, onSelectLetter, onEnter, onDelete, disabledLetters } = useContext(AppContext);

    const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    const handleKeyboard = useCallback((event) => {
        if (event.key === "Enter") {
            onEnter();
        } else if (event.key === "Backspace") {
            onDelete();
        } else {
            keys1.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key);
                    return;
                }
            })
            keys2.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key);
                    return;
                }
            })
            keys3.forEach((key) => {
                if (event.key.toLowerCase() === key.toLowerCase()) {
                    onSelectLetter(key);
                    return;
                }
            })
        }
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);


    return (
        <div className='keyboard'>
            <div className='line1'>
                {keys1.map((key) => {
                    return <Key value={key} disabled={disabledLetters.includes(key)} />
                })}
            </div>
            <div className='line2'>
                {keys2.map((key) => {
                    return <Key value={key} disabled={disabledLetters.includes(key)} />
                })}
            </div>
            <div className='line3'>
                <Key value={"ENTER"} bigKey />
                {keys3.map((key) => {
                    return <Key value={key} disabled={disabledLetters.includes(key)} />
                })}
                <Key value={"DELETE"} bigKey />
            </div>
        </div>
    )
}

export default Keyboard;