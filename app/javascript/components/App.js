import React from 'react'

import {Route, Switch, Link, Fragment} from 'react-router-dom'
import Puzzletype from './Puzzletypes/Puzzletype'
import Puzzle from './Puzzles/Puzzle'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import styled from 'styled-components'


const App = () => {
    return (
        <React.Fragment>
            <HeaderPane/>
            <ConentWrapper>
              <Switch>
                  <Route exact path="/" component={Puzzletype}/>
                  <Route exact path="/puzzles/:slug" component={Puzzle}/>
                  <Route exact path="/dailypuzzle" component={Puzzle}/>

              </Switch>
            </ConentWrapper>
        </React.Fragment>
    )
}

const ConentWrapper = styled.div`
  margin-top: 30px;
`

const NavList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #e3e4e6;
    height: 48px;
  

`

const NavEntry = styled.li`
    float: left;
    &:hover {
      background-color: #cbcdd1;
    }


`

const NavLink = styled(Link)`
  display: block;
  color: #7e7f82;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    text-decoration: none;
  }


`
const HeaderPane = () => {
    return (
        <NavList>
            <NavEntry><NavLink to = "/puzzles/daily">Sudoku of the Day</NavLink></NavEntry>
            <NavEntry><NavLink to = "/">View Puzzles</NavLink></NavEntry>

        </NavList>
    )
}
export default App