/* eslint-disable no-unused-vars */
import React from 'react'

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'

import addExtensions from './extensions'
import shortid from 'shortid'

import RollDice from './roll-dice/RollDice'
import YahtzeeGame from './yahtzee/YahtzeeGame'

addExtensions()

const AnimationWrapper = posed.div({
  enter: {
    opacity: 1,
    y: 0,
    staggerChildren: 50,
    beforeChildren: true,
    delay: 300
  },
  exit: {
    opacity: 0,
    y: 90,
    staggerChildren: 20,
    staggerDirection: -1
  }
});

const routes = ({ location }) => (
  <>
    <header>
      <h1>React Components</h1>
      <hr />
    </header>
    <div className='container-fluid text-center'>
      <PoseGroup>
        <AnimationWrapper key={shortid.generate()}>
          <Switch location={location}>
            <Route path="/roll-dice" component={RollDice} />
            <Route path="/yahtzee-game" component={YahtzeeGame} />
            <Redirect to="/roll-dice" />
          </Switch>
        </AnimationWrapper>
      </PoseGroup>
    </div>
  </>
)

export default function App () {
  return (
    <BrowserRouter>
      <Route render={routes} />
    </BrowserRouter>
  )
}
