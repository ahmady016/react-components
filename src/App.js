/* eslint-disable no-unused-vars */
import React from 'react'

import { BrowserRouter, Switch, Route, Redirect, Link, NavLink } from 'react-router-dom'
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
const SidebarItem = styled.li`
  border-radius: 0 !important;
  border-top: none !important;
  background-color: transparent !important;
`

function SidebarContent() {
  return (
    <ul className='list-group'>
      <SidebarItem className='list-group-item'>
        <NavLink className='text-light' to='/roll-dice'>
          <i class="fab fa-bandcamp mr-2"></i>
          Roll Dice
        </NavLink>
      </SidebarItem>
      <SidebarItem className='list-group-item'>
        <NavLink className='text-light' to='/yahtzee-game'>
          <i class="fab fa-bandcamp mr-2"></i>
          Yahtzee Game
        </NavLink>
      </SidebarItem>
    </ul>
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

export default function App() {
  const [sidebarOpened, setSidebarOpened] = React.useState(false)
  const [sidebarDocked, setSidebarDocked] = React.useState(mediaQuery.matches)

  return (
    <BrowserRouter>
      <Sidebar
        sidebar={<SidebarContent />}
        open={sidebarOpened}
        onSetOpen={setSidebarOpened}
        docked={sidebarDocked}
        sidebarClassName='bg-secondary text-light w-30 mt-34'
      >
        <Route render={props => <Routes {...props} setSidebarOpened={setSidebarOpened} />} />
      </Sidebar>
    </BrowserRouter>
  )
}
