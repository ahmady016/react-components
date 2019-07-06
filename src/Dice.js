import React from 'react'
import styled, { keyframes, css } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const wobble = keyframes`
  from {
    transform: translate3d(0,0,0);
  }
  15% {
    transform: translate3d(-25%,0,0), rotate3d(0,0,1,-5deg);
  }
  30% {
    transform: translate3d(20%,0,0), rotate3d(0,0,1,3deg);
  }
  45% {
    transform: translate3d(-15%,0,0), rotate3d(0,0,1,-3deg);
  }
  60% {
    transform: translate3d(10%,0,0), rotate3d(0,0,1,2deg);
  }
  75% {
    transform: translate3d(-5%,0,0), rotate3d(0,0,1,-1deg);
  }
  to {
    transform: translate3d(0,0,0);
  }
`;

const animation = props => props.isRolling ? css`${rotate} 1s ease-in-out` : 'none'

const Die = styled.i`
  margin: 0.5rem 1rem;
  padding: 0.25rem;
  font-size: 8rem;
  color: #f90;
  animation: ${animation};
`;

export default function Dice({ face = 'one', isRolling }) {
  return (
    <Die className={`fas fa-dice-${face}`}
      isRolling={isRolling}>
    </Die>
  )
}
