/* eslint-disable no-unused-vars */
import React from 'react'
import styled, { css } from 'styled-components'

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import Dice from '../roll-dice/Dice'

import { initialState, reducer, rollDice, evalScore, newGame } from './yahtzeeState'
import { getFace } from '../_shared'

const YahtzeeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: top;
`
const Card = styled.div`
  background-color: #364651 !important;
  color: #fff;
`
const CardBody = styled.div`
  padding: 0 !important;
`
const ScoreHistoryItem = styled.li`
  background-color: #364651 !important;
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

function Dices ({ totalScore, dices, dispatch, remainingRolls, isRolling, className = '' }) {
  let rollBtnText = isRolling
    ? 'Rolling ...'
    : `Roll: ${remainingRolls} Rolls Left`

  return (
    <Card className={`card ${className}`}>
      <div className='card-header'>
        <h5 className='card-title display-4'>Yahtzee Game</h5>
      </div>
      <CardBody className='card-body pt-2'>
        {dices.map( (dice, i) => (
          <Dice key={i}
            face={getFace(dice.value)}
            locked={dice.locked}
            remainingRolls={remainingRolls}
            isRolling={isRolling}
            size={4.5}
            index={i}
            dispatch={dispatch} />
        ))}
        <button className='btn btn-success btn-lg w-50 my-3'
          disabled={!remainingRolls || dices.every(dice => dice.locked)}
          onClick={ () => rollDice(dispatch) }
        >
          {rollBtnText}
        </button>
      </CardBody>
      <div className='card-footer'>
        <h4 className='display-4'>Total Score: {totalScore}</h4>
      </div>
    </Card>
  )
}

function ScoreHistory({ scoreHistory = [] }) {
  return (
    <Card className='card'>
      <div className='card-header'>
        <h4 className='card-title display-4'>Score History</h4>
      </div>
      <CardBody className='card-body'>
        <ul className='list-group'>
          { (scoreHistory.length)
            ? scoreHistory.map(score => (
                <ScoreHistoryItem key={score.date} className={`list-group-item flex-between`}>
                  <span>{ new Date(score.date).toLocaleString('en-gb') }</span>
                  <span>{score.value}</span>
                </ScoreHistoryItem>
              ))
            : <p className='my-3'>No Score History Found ...</p>
          }
        </ul>
      </CardBody>
      <div className='card-footer'>
        <h4 className='display-4'>
          Max Score &nbsp;
          { (scoreHistory.length)
            ? Math.max(...scoreHistory.map(score => score.value))
            : 0
          }
        </h4>
      </div>
    </Card>
  )
}

function ScoreBoard ({ dispatch, scores, className }) {
  return (
    <Card className={`card ${className}`}>
      <div className='card-header'>
        <h4 className='card-title display-4'>Score Rules</h4>
      </div>
      <CardBody className='card-body'>
        <ul className='list-group'>
          {scores.map(score => (
            <ScoreRule
              key={score.name}
              value={score.value}
              className={`list-group-item flex-between pointer`}
              onClick={() => evalScore(score.name, dispatch, scores)}
            >
              <span>{score.name.replace(/_/g, ' ')}</span>
              <span>{score.value === -1 ? score.description : score.value}</span>
            </ScoreRule>
          ))}
        </ul>
      </CardBody>
    </Card>
  )
}

export default function YahtzeeGame () {
  const [{ score, scores, dices, remainingRolls, isRolling, isGameOver, scoreHistory }, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    rollDice(dispatch)
  }, [])
  return (
    <>
      <YahtzeeWrapper>
        <div className='flex-b-50'>
          <Dices
            dispatch={dispatch}
            totalScore={score}
            dices={dices}
            remainingRolls={remainingRolls}
            isRolling={isRolling}
          />
          <ScoreHistory scoreHistory={scoreHistory} />
        </div>
        <ScoreBoard dispatch={dispatch} scores={scores} className='flex-b-50' />
      </YahtzeeWrapper>
      <GameOver isGameOver={isGameOver} totalScore={score} dispatch={dispatch} />
    </>
  )
}
