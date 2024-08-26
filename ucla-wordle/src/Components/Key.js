import { React, useContext } from 'react'
import { AppContext } from '../App';

function Key({ value, bigKey, disabled }) {
    const { onSelectLetter, onEnter, onDelete } = useContext(AppContext);

    const selectLetter = () => {
        if (value === "ENTER") {
            onEnter();
        } else if (value === "DELETE") {
            onDelete();
        } else {
            onSelectLetter(value);
        }
    }

  return (
    <div className='key' id={bigKey ? "big" : disabled && "disabled"} onClick={selectLetter}>
        {value}
    </div>
  )
}

export default Key