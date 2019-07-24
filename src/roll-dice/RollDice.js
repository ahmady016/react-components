import React from 'react'
import Dice from './Dice';
import styled from 'styled-components'

const DiceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: ${props => props.isRolling ? '12rem' : '8rem'};
  height: 3.5rem;
  margin: 1.5rem 0.5rem;
`;

const faces = [ 'one', 'two', 'three', 'four', 'five', 'six' ]

export default function RollDice() {
  const [die1, setDie1] = React.useState('one')
  const [die2, setDie2] = React.useState('three')
  const [isRolling, setIsRolling] = React.useState(false)

  const rollDice = React.useCallback(
    () => {
      setIsRolling(true);
      setTimeout(() => {
        setDie1(faces[Number.between(0,5)])
        setDie2(faces[Number.between(0,5)])
        setIsRolling(false)
      }, 1000)
    },
    []
  )

  return (
    <>
      <DiceWrapper>
        <Dice face={die1} isRolling={isRolling} />
        <Dice face={die2} isRolling={isRolling} />
      </DiceWrapper>
      <Button className="btn btn-success btn-lg"
        isRolling={isRolling}
        disabled={isRolling}
        onClick={rollDice}>
          {isRolling ? 'Rolling ...' : 'Roll'}
      </Button>
    </>
  )
}
