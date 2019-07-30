import React from 'react'
import styled, { css } from 'styled-components'
import { rotate } from '../_shared/cssAnimations'

const animation = props =>
  props.isRolling && !props.locked
    ? css`${rotate} 0.3s ease-in-out infinite alternate`
    : 'none'

const Die = styled.i`
  cursor: pointer;
  padding: 0.25rem;
  margin: ${ ({ size }) => (size > 5) ? "0.5rem 1rem" : "0.5rem" };
  font-size: ${ ({ size }) => size+"rem" };
  color: ${ ({ locked }) => (locked) ? "#666" : "#f90" };
  animation: ${animation};
`

export default function Dice ({
  face = 'one',
  locked = false,
  isRolling = false,
  remainingRolls = 0,
  size = 8,
  index = 0,
  dispatch = s => s
}) {
  return (
    <Die
      className={`fas fa-dice-${face}`}
      isRolling={isRolling}
      size={size}
      locked={locked}
      onClick={() => {
        if(remainingRolls)
          dispatch({ type: 'Toggle_Locked', payload: { index } })
      }}
    />
  )
}
