import { keyframes } from 'styled-components'

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const wobble = keyframes`
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
`

export const shake = keyframes`
  10%, 90% {
    transform: translate3d(-2px, 0, 0);
  }
  20%, 80% {
    transform: translate3d(4px, 0, 0);
  }
  30%, 50%, 70% {
    transform: translate3d(-6px, 0, 0);
  }
  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`

export const wiggle = keyframes`
  from {
    transform: rotate(10deg);
  }
  to {
    transform: rotate(-10deg);
  }
`
