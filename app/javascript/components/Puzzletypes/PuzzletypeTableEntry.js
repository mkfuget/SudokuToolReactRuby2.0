import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'
import './Puzzletype.css'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';


const PuzzletypeTableEntry = (props) => {

    const [visiblePuzzles, setVisiblePuzzles] = useState(false)
    const [puzzleTableEntryData, setPuzzleTableEntryData] = useState([])
    const currentPuzzleAddress = `api/v1/puzzletypes/${props.attributes.slug}.json`
    
    useEffect(()=>{
        axios.get(currentPuzzleAddress)
         .then( resp => {
            setPuzzleTableEntryData(resp.data.included)
         })
             
         .catch ( resp => console.log(resp))
    }, [puzzleTableEntryData.length])
    
    const table = puzzleTableEntryData.map( item => {
        return (
            <PuzzleTableEntry 
                key={item.attributes.name}
                attributes={item.attributes}
            />
        )
    })
    
        return (
            <Fragment>
                <Row className = "PuzzleTypeTableRow">
                    <Col className = "puzzletypeTableData">
                        <Button variant="outline-primary" onClick ={() =>
                            setVisiblePuzzles(!visiblePuzzles)
                        } 
                        >-</Button>
                        {props.attributes.name}
                    </Col>
                </Row>
                {visiblePuzzles==true && 
                    <Fragment>
                        <Row className = "PuzzleTypeDescriptionDow">
                            {props.attributes.description}
                            </Row>
                            <Row className = "puzzlesTableHeaders">
                                <Col className = "puzzlesTableHeaderData">Title</Col>
                                <Col className = "puzzlesTableHeaderData">Author</Col>
                                <Col className = "puzzlesTableHeaderData">Difficulty</Col>
                            </Row>
                            <Container>
                                {table}
                            </Container>
                        </Fragment>
                    }
            </Fragment>

        )
    }    


const PuzzleTableEntry = (props) => {
    return (
            <Row className = "PuzzleTableEntryRow">
                <Col className = "PuzzleTableEntryData">
                        <Link to={"/puzzles/"+props.attributes.slug}>{props.attributes.name}</Link>
                </Col>
                <Col className = "PuzzleTableEntryData">{props.attributes.author}</Col>
                <Col className = "PuzzleTableEntryData">{props.attributes.difficulty}</Col>
            </Row>

    )
}
export default PuzzletypeTableEntry