import React, {useState, useEffect, Fragment} from 'react'
import PuzzletypeTableEntry from './PuzzletypeTableEntry'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components'

const PuzzleTableHeader = styled.div`
    text-align: center;

`

const PuzzletypesTableSubheader = styled.div`
    text-align: center;
`

const PuzzleTable = styled.div`
    padding: 100px;
    width:800px;
`



const Puzzletype = () => {


    
    const [puzzletypes, setPuzzletypes] = useState([])
    useEffect(()=>{
        axios.get('api/v1/puzzletypes.json')
         .then( resp => {
             setPuzzletypes(resp.data.data)
         })
             
         .catch ( resp => console.log(resp))
    }, [puzzletypes.length])

    const allPuzzleTypes = puzzletypes.map( item => {
        return (
            <PuzzletypeTableEntry 
                key={item.attributes.name}
                attributes={item.attributes}
            />
        )
    })

    return (
        <div className = "Puzzletypesview">
            <PuzzleTableHeader>
                <h1>Sudoku Puzzles</h1>
                    <PuzzletypesTableSubheader>
                        Choose from a variety of interactive sudoku puzzles, options for all skill levels
                    </PuzzletypesTableSubheader> 
            </PuzzleTableHeader>
            <table>
                <tbody>
                    {allPuzzleTypes}
                </tbody>
            </table>
        </div>
    )
}


export default Puzzletype