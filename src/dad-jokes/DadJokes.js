import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import shortid from 'shortid'

import Spinner from '../_shared/Spinner'

//#region jokes logic
const JOKE_API_URL = 'https://icanhazdadjoke.com'
const JOKES_LIMIT = 10
const INIT_JOKES_STATS = {
  'em-rolling_on_the_floor_laughing': 0,
  'em-laughing': 0,
  'em-smiley': 0,
  'em-slightly_smiling_face': 0,
  'em-neutral_face': 0,
  'em-confused': 0,
  'em-angry': 0
}

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
  setState(
    state => ({
      ...state,
      loading: true
    })
  )
  const newJokes = await getJokes( new Set(jokes.map(joke => joke.joke)) )
  setState(
    state => ({
      ...state,
      loading: false,
      jokes: [...state.jokes, ...newJokes]
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

const setJokesStats = (jokes, setState) => {
  const jokesStats = jokes.reduce( (stats, { vote }) =>  {
    if (vote >= 15)
      stats['em-rolling_on_the_floor_laughing'] += 1
    else if (vote >= 12)
      stats['em-laughing'] += 1
    else if (vote >= 9)
      stats['em-smiley'] += 1
    else if (vote >= 6)
      stats['em-slightly_smiling_face'] += 1
    else if (vote >= 3)
      stats['em-neutral_face'] += 1
    else if (vote >= 0)
      stats['em-confused'] += 1
    else
      stats['em-angry'] += 1
    return stats
  }, { ...INIT_JOKES_STATS })
  setState(
    state => ({
      ...state,
      jokesStats
    })
  )
}
//#endregion

//#region styled components
const JokesWrapper = styled.div`
  height: 85vh;
  width: 90vw;
  margin: auto;
`
const JokesStats = styled.div`
  background-color: #493267 !important;
  color: #ffa700 !important;
  height: 100%;
`
const CardHeader = styled.div`
  padding: 0 !important;
`
const JokesIconCircle = styled.div`
  width: 120px;
  height: 120px;
  border: 12px solid #5d437f;
  box-shadow: inset 0px -20px 0px 20px #5d437f;
  background-color: #473064;
  border-radius: 100%;
  margin-bottom: 0.7rem !important;
`
const NewJokesBtn = styled.button`
  background-color: #ffcc5c !important;
  color: #493267 !important;
  &:hover {
    background-color: #ffa700 !important;
    color: #ffffff !important;
  }
`
const StatsBody = styled.ul`
  list-style-type: none;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: auto !important;
  margin-top: auto !important;
  padding-inline-start: 0 !important;
`
const JokesCard = styled.div`
  height: 94%;
`
const CardBody = styled.div`
  background-color: #008744 !important;
  overflow-y: auto;
`
const VoteIcon = styled.i`
  cursor: pointer;
  font-size: 2.5rem;
  line-height: 1.5rem !important;
`
const VoteValue = styled.span`
  font-size: 1.8rem;
  font-weight: 600;
  line-height: 1.5rem !important;
  color: ${ ({ vote }) => getVoteStyles(vote).color };
`
//#endregion

//#region jokes components
function Joke({ doVote, id, joke, vote }) {
  return (
    <div className="flex-between p-05-1 border-b-1">
      <div className="flex-column">
        <VoteIcon className="fas fa-caret-up"
          onClick={() => doVote(id, +1)}
        />
        <VoteValue vote={vote}>{vote}</VoteValue>
        <VoteIcon className="fas fa-caret-down"
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
    jokes: JSON.parse(localStorage.getItem('jokes') || '[]'),
    jokesStats: { ...INIT_JOKES_STATS }
  })

  React.useEffect( () => {
    if(!state.jokes.length)
      fetchJokes(state.jokes, setState)
  }, [state.jokes, state.jokes.length])

  React.useEffect(
    () => {
      localStorage.setItem('jokes', JSON.stringify(state.jokes))
      setJokesStats(state.jokes, setState)
    },
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
    <JokesWrapper className='flex-center'>
      <JokesStats className='card flex-b-35'>
        <CardHeader className='card-header flex-column-center'>
          <span className='font-w-6 font-s-25'>Dad Jokes</span>
          <JokesIconCircle>
            <i className="em em-joy font-s-4"></i>
          </JokesIconCircle>
          <NewJokesBtn
            className='btn btn-lg font-w-6'
            onClick={() => fetchJokes(state.jokes, setState)}
          >
            New Jokes
          </NewJokesBtn>
        </CardHeader>
        <div className='card-body p-0 flex-center'>
          <StatsBody>
            {Object.entries(state.jokesStats).map(([key, value]) => (
              <li key={key} className='flex-b-30 flex-center'>
                <i className={`flex-b-40 font-s-15 em ${key}`}></i>
                <span className='flex-b-40 font-s-15 font-w-6'>{value}</span>
              </li>
            ))}
          </StatsBody>
        </div>
        <div className='card-footer'>
          <span className='font-s-15 font-w-6'>Total Jokes: {state.jokes.length}</span>
        </div>
      </JokesStats>
      <JokesCard className='card flex-b-65'>
        <CardBody className='card-body text-light scroll p-0'>
          { (state.loading)
            ? <Spinner />
            : state.jokes.map(joke => <Joke key={joke.id} doVote={doVote} {...joke} />)
          }
        </CardBody>
      </JokesCard>
    </JokesWrapper>
  )
}
//#endregion
