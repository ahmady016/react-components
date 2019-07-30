/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Dice from '../roll-dice/Dice'

import { initialState, reducer, rollDice, evalScore, newGame } from './yahtzeeState'
import { getFace } from '../_shared'

const YahtzeeWrapper = styled.div`
  width: 70vw;
  margin: auto;
`
const Card = styled.div`
  background-color: #364651 !important;
  color: #fff;
`
const disabledStyles = `
  pointer-events: none;
  background-color: #cecece !important;
  color: #797979;
`
const activeStyles = `
  cursor: pointer;
  background-color: #364651 !important;
  color: #fff;
`
const ScoreRule = styled.li`
  background-color: #364651;
  &:disable {
    ${disabledStyles}
  }
  ${ ({ value }) => value > -1 ? css`${disabledStyles}` : css`${activeStyles}`}
`

function GameOver({ isGameOver, totalScore, dispatch }) {
  return (
    <Modal show={isGameOver} centered>
      <Modal.Header>
        <Modal.Title>Game Over</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3 className='display-4 text-center'>Total Score: {totalScore}</h3>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={() => newGame(dispatch)}>Start New Game</Button>
      </Modal.Footer>
    </Modal>
  )
}

function Dices ({ dices, dispatch, remainingRolls, isRolling }) {
  let rollBtnText = isRolling
    ? 'Rolling ...'
    : `Roll: ${remainingRolls} Rolls Left`

  return (
    <Card className='card w-100'>
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
    </Card>
  )
}

function ScoreBoard ({ dispatch, score, scores }) {
  return (
    <Card className='card w-100'>
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
    </Card>
  )
}

export default function YahtzeeGame () {
  const [{ score, scores, dices, remainingRolls, isRolling, isGameOver }, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    rollDice(dispatch)
  }, [])
  return (
    <YahtzeeWrapper>
      <Dices dispatch={dispatch} dices={dices} remainingRolls={remainingRolls} isRolling={isRolling} />
      <ScoreBoard dispatch={dispatch} score={score} scores={scores} />
      <GameOver isGameOver={isGameOver} totalScore={score} dispatch={dispatch} />
    </YahtzeeWrapper>
  )
}
