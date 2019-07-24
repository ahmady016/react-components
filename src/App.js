import React from 'react'
import addExtensions from './extensions'
import RollDice from './roll-dice/RollDice';

addExtensions()

export default function App () {
  return (
    <>
      <header>
        <h1>React Components</h1>
        <hr />
      </header>
      <div className='container text-center'>
        <RollDice />
      </div>
    </>
  )
}
