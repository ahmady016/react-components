import React from 'react'

import styled from 'styled-components'

const JokesCard = styled.div`
  width: 70%;
  margin: 1rem auto !important;
`
const CardHeader = styled.div`
  background-color: #ffa700 !important;
`
const CardBody = styled.div`
  height: 60vh;
  overflow-y: auto;
  background-color: #008744 !important;
`
const CardFooter = styled.div`
  background-color: #0057e7 !important;
`

export default function DadJokes() {
  return (
    <JokesCard className='card'>
      <CardHeader className='card-header flex-around'>
        <i class="em em-joy sm"></i>
        <span className='card-title display-4 text-light font-w-6'>Dad Jokes</span>
        <button className='btn btn-success btn-lg font-w-6'>New Jokes</button>
      </CardHeader>
      <CardBody className='card-body text-light'>

      </CardBody>
      <CardFooter className='card-footer text-light'>

      </CardFooter>
    </JokesCard>
  )
}
