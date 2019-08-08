import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import shortid from 'shortid'

import Spinner from '../_shared/Spinner'

//#region jokes logic
const JOKE_API_URL = 'https://icanhazdadjoke.com'
const JOKES_LIMIT = 10

const getJoke = async () => {
  try {
    const { data } = await axios.get(JOKE_API_URL, { headers: { Accept: 'application/json' } })
    console.log(data)
    return { newJoke: data.joke }
  } catch(err) {
    return { error: err.message }
  }
}

const getJokes = async (seenJokes = new Set()) => {
  const jokes = []
  while(jokes.length < JOKES_LIMIT) {
    const { newJoke } = await getJoke()
    if(newJoke && !seenJokes.has(newJoke))
      jokes.push({
        id: shortid.generate(),
        joke: newJoke,
        vote: 0
      })
  }
  return jokes
}

const fetchJokes = async (jokes, setState) => {
  setState((_state) => ({
    ..._state,
    loading: true
  }))
  const newJokes = await getJokes( new Set(jokes.map(joke => joke.joke)) )
  setState(
    _state => ({
      loading: false,
      jokes: [..._state.jokes, ...newJokes]
    })
  )
}

const getVoteStyles = (vote) => {
  if (vote >= 15)
    return { emoji: 'em em-rolling_on_the_floor_laughing', color: '#00ff3a' }
  else if (vote >= 12)
    return { emoji: 'em em-laughing', color: '#9affb1' }
  else if (vote >= 9)
    return { emoji: 'em em-smiley', color: '#fdf498' }
  else if (vote >= 6)
    return { emoji: 'em em-slightly_smiling_face', color: '#ffa700' }
  else if (vote >= 3)
    return { emoji: 'em em-neutral_face', color: '#eedc31' }
  else if (vote >= 0)
    return { emoji: 'em em-confused', color: '#002d0a' }
  else
    return { emoji: 'em em-angry', color: '#8f0900' }
}
//#endregion

//#region styled components
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
`
const VoteValue = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.5rem !important;
  position: relative;
  top: -2px;
  color: ${ ({ vote }) => getVoteStyles(vote).color };
`
//#endregion

//#region jokes components
function Joke({ doVote, id, joke, vote }) {
  return (
    <div className="flex-between p-05-1 border-b-1">
      <div className="flex-column">
        <VoteIcon className="fas fa-chevron-up"
          onClick={() => doVote(id, +1)}
        />
        <VoteValue vote={vote}>{vote}</VoteValue>
        <VoteIcon className="fas fa-chevron-down"
          onClick={() => doVote(id, -1)}
        />
      </div>
      <div className="content-text flex-g-1 mx-3">{joke}</div>
      <div className="">
        <i className={`font-s-15 ${getVoteStyles(vote).emoji}`} />
      </div>
    </div>
  );
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

  React.useEffect(
    () => void localStorage.setItem('jokes', JSON.stringify(state.jokes)),
    [state.jokes]
  )

  const doVote = React.useCallback((jokeId, value) => {
    setState(
      state => ({
        ...state,
        jokes: state.jokes.map(joke =>
          (joke.id === jokeId)
            ? { ...joke,
                vote: joke.vote + value
              }
            : joke
        )
      })
    )
  }, [])

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
          : state.jokes.map(joke => <Joke key={joke.id} doVote={doVote} {...joke} />)
        }
      </CardBody>
      <CardFooter className='card-footer text-light'>
        <span>Count: {state.jokes.length}</span>
      </CardFooter>
    </JokesCard>
  )
}
//#endregion
