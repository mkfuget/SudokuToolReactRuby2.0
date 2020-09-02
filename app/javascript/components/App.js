import React from 'react'
import {Route, Switch, Fragment} from 'react-router-dom'
import Puzzletype from './Puzzletypes/Puzzletype'
import Puzzle from './Puzzles/Puzzle'
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';



const App = () => {
    return (
        <React.Fragment>
            <HeaderPane/>
            <Switch>
                <Route exact path="/" component={Puzzletype}/>
                <Route exact path="/puzzles/:slug" component={Puzzle}/>

            </Switch>
        </React.Fragment>
    )
}

const HeaderPane = () => {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Sudoku of the Day</Nav.Link>
            <Nav.Link href="#link">View Puzzles</Nav.Link>
            <Nav.Link href="#link">Create Custom Sudoku</Nav.Link>
            <Nav.Link href="#link">View Puzzles</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>      
    )
}
export default App