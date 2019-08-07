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
  width: 62%;
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

function Joke({ id, joke, vote }) {
  return (
    <div className='alert'>
      <span>{joke}</span>
      <span>{vote}</span>
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
        <i className="em em-joy sm"></i>
        <span className='card-title display-4 text-dark font-w-6'>Dad Jokes</span>
        <button className='btn btn-success btn-lg font-w-6'>New Jokes</button>
      </CardHeader>
      <CardBody className='card-body text-light scroll'>
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
