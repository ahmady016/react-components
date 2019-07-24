import React from 'react'
import styled, { css } from 'styled-components'
import { rotate } from '../_shared/cssAnimations'

const animation = props =>
  props.isRolling
    ? css`${rotate} 0.3s ease-in-out infinite alternate`
    : 'none'

const Die = styled.i`
  margin: 0.5rem 1rem;
  padding: 0.25rem;
  font-size: ${ ({ size }) => size+'rem' };
  color: #f90;
  animation: ${animation};
`

export default function Dice ({ face = 'one', isRolling = false, size = 8 }) {
  return <Die className={`fas fa-dice-${face}`} isRolling={isRolling} size={size} />
}
