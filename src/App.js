/* eslint-disable no-unused-vars */
import React from 'react'

import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'
import Sidebar from 'react-sidebar'

import addExtensions from './extensions'
import shortid from 'shortid'

import RollDice from './roll-dice/RollDice'
import YahtzeeGame from './yahtzee/YahtzeeGame'

addExtensions()

const mediaQuery = window.matchMedia(`(min-width: 2000px)`)

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

const Container = styled.div`
  margin: 4rem 0 0.6rem;
`
const SidebarIcon = styled.i`
  cursor: pointer;
  margin-right: 1rem;
  font-size: 2rem;
  color: #fff;
`

function SidebarContent () {
  return (
    <h3>sidebar content ...</h3>
  )
}

function Header({ setSidebarOpened }) {
  return (
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <SidebarIcon className="fas fa-bars"
          onClick={() => setSidebarOpened((opened) => !opened)}>
        </SidebarIcon>
        <Link className='navbar-brand' to='/roll-dice'>
          React Components
        </Link>
      </nav>
    </header>
  )
}

const Routes = ({ location, setSidebarOpened }) => (
  <>
    <Header setSidebarOpened={setSidebarOpened} />
    <Container className='container-fluid text-center'>
      <PoseGroup>
        <AnimationWrapper key={shortid.generate()}>
          <Switch location={location}>
            <Route path="/roll-dice" component={RollDice} />
            <Route path="/yahtzee-game" component={YahtzeeGame} />
            <Redirect to="/roll-dice" />
          </Switch>
        </AnimationWrapper>
      </PoseGroup>
    </Container>
  </>
)

export default function App () {
  const [sidebarOpened, setSidebarOpened] = React.useState(false)
  const [sidebarDocked, setSidebarDocked] = React.useState(mediaQuery.matches)

  return (
    <BrowserRouter>
      <Sidebar
        sidebar={<SidebarContent />}
        open={sidebarOpened}
        onSetOpen={setSidebarOpened}
        docked={sidebarDocked}
        sidebarClassName='bg-secondary text-light w-30 mt-34 p-1'
        contentClassName=''
      >
        <Route render={(props) => (<Routes {...props} setSidebarOpened={setSidebarOpened} />)} />
      </Sidebar>
    </BrowserRouter>
  )
}
