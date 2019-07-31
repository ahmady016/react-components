/* eslint-disable no-unused-vars */
import React from 'react'
import addExtensions from './extensions'
import RollDice from './roll-dice/RollDice';
import YahtzeeGame from './yahtzee/YahtzeeGame';

addExtensions()

export default function App () {
  return (
    <>
      <header>
        <h1>React Components</h1>
        <hr />
      </header>
      <div className='container-fluid text-center'>
        {/* <RollDice /> */}
        <YahtzeeGame />
      </div>
    </>
  )
}
