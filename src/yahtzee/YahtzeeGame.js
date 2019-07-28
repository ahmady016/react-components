/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components'
import Dice from '../roll-dice/Dice'

import { initialState, reducer, rollDice, evalScore } from './yahtzeeState'
import { getFace } from '../_shared'

const YahtzeeWrapper = styled.div`
  width: 70vw;
  margin: auto;
`
const disabledStyles = `
  pointer-events: none;
  background-color: #cecece !important;
  color: #797979;
`
const ScoreRule = styled.li`
  &:disable {
    ${disabledStyles}
  }
  ${ ({ value }) => value > -1 ? css`${disabledStyles}` : ''}
`

function Dices ({ dices, dispatch, remainingRolls, isRolling }) {
  let rollBtnText = isRolling
    ? 'Rolling ...'
    : `Roll: ${remainingRolls} Rolls Left`

  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h5 className='card-title display-4'>Yahtzee Game</h5>
      </div>
      <div className='card-body'>
        {dices.map( (dice, i) => (
          <Dice key={i}
            face={getFace(dice.value)}
            locked={dice.locked}
            remainingRolls={remainingRolls}
            isRolling={isRolling}
            size={6}
            index={i}
            dispatch={dispatch} />
        ))}
      </div>
      <div className='card-footer'>
        <button className='btn btn-success btn-lg w-25'
          disabled={!remainingRolls || dices.every(dice => dice.locked)}
          onClick={ () => rollDice(dispatch) }
        >
          {rollBtnText}
        </button>
      </div>
    </div>
  )
}

function ScoreBoard ({ dispatch, score, scores }) {
  return (
    <div className='card w-100'>
      <div className='card-header'>
        <h3 className='card-title display-4'>Total Score: {score}</h3>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {scores.map(score => (
            <ScoreRule
              key={score.name}
              value={score.value}
              className={`list-group-item flex-between pointer`}
              onClick={() => evalScore(score.name, dispatch)}
            >
              <span>{score.name.replace(/_/g, ' ')}</span>
              <span>{score.value === -1 ? score.description : score.value}</span>
            </ScoreRule>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function YahtzeeGame () {
  const [{ score, scores, dices, remainingRolls, isRolling }, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    rollDice(dispatch)
  }, [])
  return (
    <YahtzeeWrapper>
      <Dices dispatch={dispatch} dices={dices} remainingRolls={remainingRolls} isRolling={isRolling} />
      <ScoreBoard dispatch={dispatch} score={score} scores={scores} />
    </YahtzeeWrapper>
  )
}
