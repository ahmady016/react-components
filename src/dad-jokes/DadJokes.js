import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import Spinner from '../_shared/Spinner'

const JOKE_API_URL = 'https://icanhazdadjoke.com'
const JOKES_LIMIT = 10

const getJoke = async () => {
  try {
    const { data } = await axios.get(JOKE_API_URL, { headers: { Accept: 'application/json' } })
    console.log(data)
    return { newJoke: { id: data.id, joke: data.joke } }
  } catch(err) {
    return { error: err.message }
  }
}

const getJokes = async (seenJokes = new Set()) => {
  const jokes = []
  while(jokes.length < JOKES_LIMIT) {
    const { newJoke } = await getJoke()
    if(newJoke && !seenJokes.has(newJoke.joke))
      jokes.push({
        id: newJoke.id,
        joke: newJoke.joke,
        vote: 0
      })
  }
  return jokes
}

const fetchJokes = async (jokes, setState) => {
  setState((state) => ({
    ...state,
    loading: true
  }))
  const newJokes = await getJokes( new Set(jokes.map(joke => joke.joke)) )
  localStorage.setItem('jokes', JSON.stringify(newJokes))
  setState((state) => ({
    loading: false,
    jokes: [...state.jokes, ...newJokes]
  }))
}

const JokesCard = styled.div`
  width: 70%;
  margin: auto !important;
`
const CardHeader = styled.div`
  background-color: #ffa700 !important;
  padding: 0 !important;
`
const CardBody = styled.div`
  background-color: #008744 !important;
  height: 67vh;
  overflow-y: auto;
`
const CardFooter = styled.div`
  background-color: #0057e7 !important;
`
const VoteIcon = styled.i`
  cursor: pointer;
  font-size: 2rem;
  line-height: 1rem !important;
`
const VoteValue = styled.span`
  font-size: 1.8rem;
  line-height: 1.5rem !important;
  position: relative;
  top: -2px;
`

function Joke({ id, joke, vote }) {
  return (
    <div className='flex-between p-05-1 border-b-1'>
      <div className='flex-column'>
        <VoteIcon className="fas fa-chevron-up"></VoteIcon>
        <VoteValue>{vote}</VoteValue>
        <VoteIcon className="fas fa-chevron-down"></VoteIcon>
      </div>
      <div className='content-text flex-g-1 mx-3'>{joke}</div>
      <div className=''>
        <i className="em em-joy font-s-15"></i>
      </div>
    </div>
  )
}

export default function DadJokes() {
  const [state, setState] = React.useState({
    loading: false,
    jokes: JSON.parse(localStorage.getItem('jokes') || '[]')
  })

  React.useEffect( () => {
    if(!state.jokes.length)
      fetchJokes(state.jokes, setState)
  }, [state.jokes, state.jokes.length])

  return (
    <JokesCard className='card'>
      <CardHeader className='card-header flex-around'>
        <i className="em em-joy font-s-25"></i>
        <span className='card-title display-4 text-dark font-w-6'>Dad Jokes</span>
        <button className='btn btn-success btn-lg font-w-6'>New Jokes</button>
      </CardHeader>
      <CardBody className='card-body text-light scroll p-0'>
        { (state.loading)
          ? <Spinner />
          : state.jokes.map(joke => <Joke key={joke.id} {...joke} />)
        }
      </CardBody>
      <CardFooter className='card-footer text-light'>
        <span>Count: {state.jokes.length}</span>
      </CardFooter>
    </JokesCard>
  )
}
