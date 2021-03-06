/* eslint-disable no-unused-vars */
import React from 'react'

import { withRouter, Switch, Route, Redirect, Link, NavLink } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import styled from 'styled-components'
import Sidebar from 'react-sidebar'

import addExtensions from './extensions'
import shortid from 'shortid'

import RollDice from './roll-dice/RollDice'
import YahtzeeGame from './yahtzee/YahtzeeGame'
import DadJokes from './dad-jokes/DadJokes'

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
`

const isActive = (path) => window.location.pathname.includes(path)

function SidebarContent() {
  return (
    <ul className='list-group'>
      <SidebarItem className={`list-group-item ${isActive('/roll-dice') ? 'active' : ''}`}>
        <NavLink className={isActive('/roll-dice') ? 'text-light' : ''} to='/roll-dice'>
          <i className="fab fa-bandcamp mr-2"></i>
          Roll Dice
        </NavLink>
      </SidebarItem>
      <SidebarItem className={`list-group-item ${isActive('/yahtzee-game') ? 'active' : ''}`}>
        <NavLink className={isActive('/yahtzee-game') ? 'text-light' : ''} to='/yahtzee-game'>
          <i className="fab fa-bandcamp mr-2"></i>
          Yahtzee Game
        </NavLink>
      </SidebarItem>
      <SidebarItem className={`list-group-item ${isActive('/dad-jokes') ? 'active' : ''}`}>
        <NavLink className={isActive('/dad-jokes') ? 'text-light' : ''} to='/dad-jokes'>
          <i className="fab fa-bandcamp mr-2"></i>
          Dad Jokes
        </NavLink>
      </SidebarItem>
    </ul>
  )
}

function Header({ setSidebarOpened }) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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

function Routes({ location, setSidebarOpened }) {
  return (
    <>
      <Header setSidebarOpened={setSidebarOpened} />
      <Container className='container-fluid text-center'>
        <PoseGroup>
          <AnimationWrapper key={shortid.generate()}>
            <Switch location={location}>
              <Route path="/roll-dice" component={RollDice} />
              <Route path="/yahtzee-game" component={YahtzeeGame} />
              <Route path="/dad-jokes" component={DadJokes} />
              <Redirect to="/roll-dice" />
            </Switch>
          </AnimationWrapper>
        </PoseGroup>
      </Container>
    </>
  )
}

function App({ location }) {
  // sidebar state
  const [sidebarOpened, setSidebarOpened] = React.useState(false)
  const [sidebarDocked, setSidebarDocked] = React.useState(mediaQuery.matches)
  // handle media query changed
  const mediaQueryChanged = React.useCallback( () => {
    setSidebarDocked(mediaQuery.matches)
    setSidebarOpened(false)
  }, [setSidebarOpened, setSidebarDocked])
  // register mediaQueryChanged handler to the mediaQuery events
  // and remove it when component unmounted
  React.useEffect(() => {
    mediaQuery.addListener(mediaQueryChanged)
    return () => void mediaQuery.removeListener(mediaQueryChanged)
  },[mediaQueryChanged])

  return (
    <Sidebar
      sidebar={<SidebarContent location={location} />}
      open={sidebarOpened}
      onSetOpen={setSidebarOpened}
      docked={sidebarDocked}
      sidebarClassName='bg-light w-25 mt-34'
    >
      <Route render={props => <Routes {...props} setSidebarOpened={setSidebarOpened} />} />
    </Sidebar>
  )
}

export default withRouter(App)
