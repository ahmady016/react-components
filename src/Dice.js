import React from 'react'
import styled, { css } from 'styled-components'
import { rotate } from './cssAnimations'

const animation = props =>
  props.isRolling
    ? css`${rotate} 0.3s ease-in-out infinite alternate`
    : 'none'

const Die = styled.i`
  margin: 0.5rem 1rem;
  padding: 0.25rem;
  font-size: 8rem;
  color: #f90;
  animation: ${animation};
`

export default function Dice ({ face = 'one', isRolling }) {
  return <Die className={`fas fa-dice-${face}`} isRolling={isRolling} />
}
