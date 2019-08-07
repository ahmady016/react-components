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
  background-color: #008744 !important;
  height: 66vh;
  overflow-y: auto;
`
const CardFooter = styled.div`
  background-color: #0057e7 !important;
`

export default function DadJokes() {
  return (
    <JokesCard className='card'>
      <CardHeader className='card-header flex-around'>
        <i class="em em-joy sm"></i>
        <span className='card-title display-4 text-dark font-w-6'>Dad Jokes</span>
        <button className='btn btn-success btn-lg font-w-6'>New Jokes</button>
      </CardHeader>
      <CardBody className='card-body text-light'>

      </CardBody>
      <CardFooter className='card-footer text-light'>

      </CardFooter>
    </JokesCard>
  )
}
