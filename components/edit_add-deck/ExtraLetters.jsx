'use client'

import React from 'react'
import { useState } from 'react'

const ExtraLetters = ({ updateState, inputRef }) => {
  // State for toggling having capital or lowercase letters shown.
  const [showCapitalLetters, setShowCapitalLetters] = useState(false);
  const toggleShowCapitalLetters = () => { 
    setShowCapitalLetters((prev) => !prev)
    inputRef.current.focus(); // Focus on the input after this button click.
  }

  // Add a letter to the state's value.
  const addLetter = (letter) => {
    updateState((prevState) => prevState + letter);
    inputRef.current.focus();
  }

  return (
    <div className='letter-button-flex gap-2 mt-10'>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'Á' : 'á')}>
        {showCapitalLetters ? 'Á' : 'á'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'É' : 'é')}>
        {showCapitalLetters ? 'É' : 'é'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'Í' : 'í')}>
        {showCapitalLetters ? 'Í' : 'í'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'Ó' : 'ó')}>
        {showCapitalLetters ? 'Ó' : 'ó'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'Ú' : 'ú')}>
        {showCapitalLetters ? 'Ú' : 'ú'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'Ü' : 'ü')}>
        {showCapitalLetters ? 'Ü' : 'ü'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter(showCapitalLetters ? 'Ñ' : 'ñ')}>
        {showCapitalLetters ? 'Ñ' : 'ñ'}
      </button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter('¿')}>¿</button>
      <button className='letter-button rounded d-flex align-items-center justify-content-center' onClick={() => addLetter('¡')}>¡</button>
      <button className='case-changer rounded d-flex align-items-center justify-content-center fw-medium' onClick={toggleShowCapitalLetters}>Aa</button>
    </div>
  )
}

export default ExtraLetters