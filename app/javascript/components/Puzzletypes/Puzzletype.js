import React, {useState, useEffect, Fragment} from 'react'
import PuzzletypeTableEntry from './PuzzletypeTableEntry'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Puzzletype = () => {
    const [puzzletypes, setPuzzletypes] = useState([])
    useEffect(()=>{
        axios.get('api/v1/puzzletypes.json')
         .then( resp => {
             setPuzzletypes(resp.data.data)
         })
             
         .catch ( resp => console.log(resp))
    }, [puzzletypes.length])

    const table = puzzletypes.map( item => {
        return (
            <PuzzletypeTableEntry 
                key={item.attributes.name}
                attributes={item.attributes}
            />
        )
    })

    return (
        <div className = "Puzzletypesview">
            <div className = "PuzzletypesTableHeader">
                <h1>Sudoku Puzzles</h1>
                <div className = "PuzzletypesTableSubheader">Choose from a variety of interactive sudoku puzzles, options for all skill levels</div> 
            </div>
            <Container className = "puzzletypeTable">
                {table}
            </Container>
        </div>
    )
}


export default Puzzletype