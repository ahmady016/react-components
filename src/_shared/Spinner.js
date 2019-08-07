import React from 'react'
import styled, { keyframes } from 'styled-components'

/*
  Follow me on
  Dribbble: https://dribbble.com/supahfunk
  Twitter: https://twitter.com/supahfunk
  Codepen: https://codepen.io/supah/
*/

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`
const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`
const SpinnerWrapper = styled.svg`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  width: 50px;
  height: 50px;
  animation: ${rotate} 2s linear infinite;
`
const SpinnerPath = styled.circle`
  stroke: #93bfec;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`

export default function Spinner() {
  return (
    <SpinnerWrapper viewBox="0 0 50 50">
      <SpinnerPath cx="25" cy="25" r="20" fill="none" stroke-width="5" />
    </SpinnerWrapper>
  )
}
