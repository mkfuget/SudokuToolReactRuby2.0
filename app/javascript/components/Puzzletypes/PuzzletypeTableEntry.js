import React, {useState, useEffect, Fragment} from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import styled from 'styled-components'

const PuzzleTypeHeaderRow = styled.tr`
    height: 40px;
`
const PuzzleTypeHeaderData = styled.td`
    padding-top: 800px;
    text-algin: top;
`
const PuzzleTypeDescriptionRow = styled.tr`
    border-bottom: 2px solid;
    border-color: black;
`
const PuzzleTypeDescriptionData = styled.td`
    border-bottom: 2px solid;
    border-color: black;
    font-size: 18px;

`

const PuzzleTableHeaderData = styled.td`
    width: 200px;
    height: 30px;
    text-align: left;
    vertical-align: middle;
    border: 1px solid;
    border-color: white;
    font-size: 24px;
`

const PuzzleTableEntryData = styled.td`
    width: 200px;
    height: 30px;
    text-align: left;
    vertical-align: middle;
    border: 1px solid;
    border-color: white;
    font-size: 18px;

`

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
    
    const allPuzzlesInType = puzzleTableEntryData.map( item => {
        return (
            <PuzzleTableEntry 
                key={item.attributes.name}
                attributes={item.attributes}
            />
        )
    })
    
        return (
            <Fragment>
                <PuzzleTypeHeaderRow>
                    <PuzzleTableHeaderData>
                        <Button variant="outline-primary" onClick ={() =>
                            setVisiblePuzzles(!visiblePuzzles)
                        } 
                        >
                        {visiblePuzzles 
                            ? '-'
                            : '+'
                        }
                        </Button>
                        {" "+props.attributes.name}
                    </PuzzleTableHeaderData>
                </PuzzleTypeHeaderRow>

                <PuzzleTypeDescriptionRow>
                    <PuzzleTypeDescriptionData>
                        {props.attributes.description}
                    </PuzzleTypeDescriptionData>
                </PuzzleTypeDescriptionRow>
                {visiblePuzzles==true && 
                    <tr>
                    <table>
                        <tbody>
                            <tr className = "puzzlesTableHeaders">
                                <PuzzleTableHeaderData>Title</PuzzleTableHeaderData>
                                <PuzzleTableHeaderData>Author</PuzzleTableHeaderData>
                                <PuzzleTableHeaderData>Difficulty</PuzzleTableHeaderData>
                            </tr>
                                {allPuzzlesInType}
                            </tbody>
                        </table>
                        </tr>
                    }
            </Fragment>

        )
    }    


const PuzzleTableEntry = (props) => {

    return (
            <tr className = "PuzzleTableEntryRow">
                <PuzzleTableEntryData>
                        <Link to={"/puzzles/"+props.attributes.slug}>{props.attributes.name}</Link>
                </PuzzleTableEntryData>
                <PuzzleTableEntryData>{props.attributes.author}</PuzzleTableEntryData>
                <PuzzleTableEntryData>{props.attributes.difficulty}</PuzzleTableEntryData>
            </tr>

    )
}
export default PuzzletypeTableEntry