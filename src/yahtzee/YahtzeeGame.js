/* eslint-disable no-unused-vars */
import React from 'react'
import styled from 'styled-components'
import Dice from '../roll-dice/Dice'

import { faces, getFace } from '../_shared'

const YahtzeeWrapper = styled.div`
  width: 70vw;
  margin: auto;
`

const DICES_LENGTH = 5
const ROLLS_LENGTH = 3
const dices = Array.from({ length: DICES_LENGTH }).fill({
  value: 1,
  locked: false
})
const scores = [
  {
    name: 'Ones',
    description: '1 point per each 1',
    value: -1
  },
  {
    name: 'Twos',
    description: '2 points per each 2',
    value: -1
  },
  {
    name: 'Threes',
    description: '3 points per each 3',
    value: -1
  },
  {
    name: 'Fours',
    description: '4 points per each 4',
    value: -1
  },
  {
    name: 'Fives',
    description: '5 points per each 5',
    value: -1
  },
  {
    name: 'Sixes',
    description: '6 points per each 6',
    value: -1
  },
  {
    name: 'Chance',
    description: 'Sum of All dice',
    value: -1
  },
  {
    name: 'Three_Of_Kind',
    description: 'Sum the same 3 dice',
    value: -1
  },
  {
    name: 'Four_Of_Kind',
    description: 'Sum the same 4 dice',
    value: -1
  },
  {
    name: 'Full_House',
    description: '30 points if get same 2 and same 3 dice',
    value: -1
  },
  {
    name: 'Small_Straight',
    description: '40 points if 4 dice are in sequence',
    value: -1
  },
  {
    name: 'Large_Straight',
    description: '50 points if 5 dice are in sequence',
    value: -1
  },
  {
    name: 'Yahtzee',
    description: '60 points if All dice are the same',
    value: -1
  }
]

function Dices () {
  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h5 className='card-title'>Yahtzee Game</h5>
      </div>
      <div className='card-body'>
        {dices.map(dice => (
          <Dice face={getFace(dice.value)} />
        ))}
      </div>
      <div className='card-footer'>
        <button className='btn btn-primary btn-lg'>Roll</button>
      </div>
    </div>
  )
}

function ScoreBoard () {
  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h5 className='card-title'>Your Score:</h5>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {scores.map(score => (
            <li className='list-group-item flex-between'>
              <span>{score.name.replace('_', ' ')}</span>
              <span>{score.value === -1 ? score.description : score.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function YahtzeeGame () {
  return (
    <YahtzeeWrapper>
      <Dices />
      <ScoreBoard />
    </YahtzeeWrapper>
  )
}
