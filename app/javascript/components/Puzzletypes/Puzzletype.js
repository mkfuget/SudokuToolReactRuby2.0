import React, {useState, useEffect, Fragment} from 'react'
import PuzzletypeTableEntry from './PuzzletypeTableEntry'
import axios from 'axios'
import styled from 'styled-components'

const PuzzleTableHeader = styled.div`
    text-align: center;

`

const PuzzletypesTableSubheader = styled.div`
    text-align: center;
    font-size: 
`

const PuzzleTable = styled.div`
    margin-left: 100px;
    margin-right: 100px;

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
        <PuzzleTable>
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
        </PuzzleTable>
    )
}


export default Puzzletype