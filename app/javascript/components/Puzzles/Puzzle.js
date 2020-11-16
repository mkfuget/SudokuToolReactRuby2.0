import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useSelector, useDispatch} from 'react-redux'
import {useSpring, animated} from 'react-spring'
import BoardData from '../functional/BoardData'
import styled from 'styled-components'
import ADD_TO_BOARD_SUCESSFUL from '../ActionCreators';
import store from '../../packs/index.jsx'


const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;
const BOARD_SQUARES = 81;
var currentIndex = -1;

const CELL_COLOR_ORANGE = [255, 122, 0];
const CELL_COLOR_RED = [255, 0, 0];
const CELL_COLOR_GREEN = [0, 255, 0];
const CELL_COLOR_BLUE = 'rgba(0, 153, 255, 0.1)';
const CELL_COLOR_WHITE = 'white';
var highlightColor = 'rgba(0, 153, 255, 0.1)';


const CellStyle = styled(animated.td)`

    border: 1px solid gray;
    font-size: 16px;
    height: 36px;
    width: 36px;
    text-align: center;
    &: first-child {
        border-left:solid medium gray;
    }
    &:nth-child(3n) {
        border-right:solid medium gray;
    }

`

const BoardRow = styled.tr`
    &: first-child {
        border-top:solid medium gray;
    }
    &:nth-child(3n) {
        border-bottom:solid medium gray;
    }
`

const BoardTable = styled.table`
    margin-left: 80px;
`

const SudokuCell = (props) => {
    const colorOut = 'rgba('+props.flashColor+', 0)';
    const colorIn = 'rgba('+props.flashColor+', 0.7)';


    const flashSquare = useSpring({
        config: {
            Mass: 10,
            Tension: 4,
            precision: 0.3,
            friction: 20,
            duration: 200
        },
        to: [{backgroundColor:colorIn}, {backgroundColor:colorOut}],
        from: {backgroundColor:colorOut}    
            
    });
    return ( 
        <Fragment>
        {props.flashOn 
            ? <CellStyle 
                style = {flashSquare}
                className= "CellStyle"
                onClick={props.onClick}
        >
                {props.value!==0 ? props.value : ""}
            </CellStyle>
            : <CellStyle 
                style = {{backgroundColor:props.cellColor}}
                className= "CellStyle"
                onClick={props.onClick}
            >
                {props.value!==0 ? props.value : ""}
            </CellStyle>
        }
        </Fragment>
    )
}

  
  
const Board = (props) => {
    
    const renderSquare = index => {
        
        return (
            <SudokuCell 
                value ={props.boardRenderData[index].boardSudokuCells+1} 
                cellColor={props.boardRenderData[index].cellColors} 
                flashOn = {props.boardRenderData[index].flashOn}
                flashColor = {props.boardRenderData[index].flashColor}
                onClick={() => {props.squareClickFunction(index)}}  
            />
        );
    }

    return (
        <BoardTable>
            <tbody>
                <BoardRow>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(9)}
                    {renderSquare(10)}
                    {renderSquare(11)}
                    {renderSquare(12)}
                    {renderSquare(13)}
                    {renderSquare(14)}
                    {renderSquare(15)}
                    {renderSquare(16)}
                    {renderSquare(17)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(18)}
                    {renderSquare(19)}
                    {renderSquare(20)}
                    {renderSquare(21)}
                    {renderSquare(22)}
                    {renderSquare(23)}
                    {renderSquare(24)}
                    {renderSquare(25)}
                    {renderSquare(26)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(27)}
                    {renderSquare(28)}
                    {renderSquare(29)}
                    {renderSquare(30)}
                    {renderSquare(31)}
                    {renderSquare(32)}
                    {renderSquare(33)}
                    {renderSquare(34)}
                    {renderSquare(35)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(36)}
                    {renderSquare(37)}
                    {renderSquare(38)}
                    {renderSquare(39)}
                    {renderSquare(40)}
                    {renderSquare(41)}
                    {renderSquare(42)}
                    {renderSquare(43)}
                    {renderSquare(44)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(45)}
                    {renderSquare(46)}
                    {renderSquare(47)}
                    {renderSquare(48)}
                    {renderSquare(49)}
                    {renderSquare(50)}
                    {renderSquare(51)}
                    {renderSquare(52)}
                    {renderSquare(53)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(54)}
                    {renderSquare(55)}
                    {renderSquare(56)}
                    {renderSquare(57)}
                    {renderSquare(58)}
                    {renderSquare(59)}
                    {renderSquare(60)}
                    {renderSquare(61)}
                    {renderSquare(62)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(63)}
                    {renderSquare(64)}
                    {renderSquare(65)}
                    {renderSquare(66)}
                    {renderSquare(67)}
                    {renderSquare(68)}
                    {renderSquare(69)}
                    {renderSquare(70)}
                    {renderSquare(71)}
                </BoardRow>
                <BoardRow>
                    {renderSquare(72)}
                    {renderSquare(73)}
                    {renderSquare(74)}
                    {renderSquare(75)}
                    {renderSquare(76)}
                    {renderSquare(77)}
                    {renderSquare(78)}
                    {renderSquare(79)}
                    {renderSquare(80)}
                </BoardRow>
            </tbody>
        </BoardTable>
    );
}


function PuzzleInner(props) {

    const dispatch = useDispatch();
    const initialState = props.puzzleDatabasePull.data;
    const puzzleType = props.puzzleDatabasePull.puzzletype_id;
    var currentBoard = new BoardData(initialState, puzzleType);
    const initialRenderArray = Array(BOARD_SQUARES).fill(0);
    for(var i=0; i<BOARD_SQUARES; i++)
    {
        const  initialRenderData = 
        {
            flashOn: false,
            boardSudokuCells: currentBoard.getNumberAtIndex(i),
            cellColors: CELL_COLOR_WHITE,
            flashColor: CELL_COLOR_ORANGE
        } 
        initialRenderArray[i] = initialRenderData;
        if(currentBoard.getNumberAtIndex(i)!== -1)
        {
            dispatch(ADD_TO_BOARD_SUCESSFUL(i, currentBoard.getNumberAtIndex(i)))
        }
    }

    const [boardRenderData, setBoardRenderData] = useState(initialRenderArray);

    const selectEntry = (index) =>
    {
        const currentColors = [...boardRenderData];
        if(currentIndex!== index && currentIndex!== -1)
        {
            currentColors[currentIndex].cellColors = CELL_COLOR_WHITE;
        }

       currentIndex = index;
       currentColors[currentIndex].cellColors = CELL_COLOR_BLUE;
       setBoardRenderData(currentColors);
   }

    const deSelectEntry = () =>
    {
        const currentColors = [...boardRenderData];
        currentColors[currentIndex].cellColors = CELL_COLOR_WHITE;
        setBoardRenderData(currentColors);
        currentIndex = -1;
    }

    const testLightSquareSequence = () =>
    {
        var index = 0;

        var timer = setInterval(function(){
            lightUpSquare(index, CELL_COLOR_ORANGE);
            index++
            if(index>80)
            {
                clearInterval(timer);
            }

        }, 750)
    }

   const solvePuzzle = () =>
    {
       var timeStep = 0;
       var solutionOrder = currentBoard.solvePuzzle();
       
       var timer = setInterval(function(){
            var stepTaken = solutionOrder[timeStep].stepTaken;
            var flashIndex = solutionOrder[timeStep].index;
            var numberAdded = solutionOrder[timeStep].number;

            const currentRenderData = [...boardRenderData];


            for(var i=0; i<BOARD_SQUARES; i++)
            {
                if(stepTaken === 'Added')
                {
                    currentRenderData[i].flashColor = CELL_COLOR_GREEN;
                    currentRenderData[flashIndex].boardSudokuCells = numberAdded;
                }
                else if(stepTaken === 'Removed')//TODO
                {
                    currentRenderData[i].flashColor = CELL_COLOR_RED;
                    currentRenderData[flashIndex].boardSudokuCells = -1;
                }
    
                if(i===flashIndex)
                {
                    currentRenderData[i].flashOn = true;
                }
                else
                {
                    currentRenderData[i].flashOn = false;
                }
            }

            setBoardRenderData(currentRenderData);
            timeStep++;
            if(timeStep>solutionOrder.length)
            {
                clearInterval(timer);
            }
       }, 400)
       
    }


   const handleKeyDown = e =>
   {

       if(e.key >= 0 && e.key < 9)
       {
           var number = parseInt(e.key)-1;
           if(currentBoard.addEntry(currentIndex, number))
           {
               dispatch(ADD_TO_BOARD_SUCESSFUL(currentIndex, number));
               const currentBoardValues  = [...boardRenderData];
               currentBoardValues[currentIndex].boardSudokuCells = number;

               setBoardRenderData(currentBoardValues);        
           }
           else
           {
               var indices = [];
               for(var i=0; i<BOARD_SQUARES; i++)
               {

                   if(!currentBoard.conflictOnBoard(currentIndex, number, i) && i!==number)
                   {
                       indices.push(i);
                   }
               }
                              
           }
       }
   }
   
   React.useEffect(() => {
       document.addEventListener('keydown', handleKeyDown)
   
       return () => {
         document.removeEventListener('keydown', handleKeyDown)
       }
   })
   
   const handleClick = index =>
   {       
       if(index === currentIndex)
       {
           deSelectEntry();
       }
       else
       {
           selectEntry(index);
       }
   }
                   
    return (
        <Fragment>
            <Board 
                boardRenderData = {boardRenderData}
                squareClickFunction = {handleClick}
            />  
            <button type="button" class="btn btn-primary" onClick ={solvePuzzle}>Solve</button>
            <button type="button" class="btn btn-primary" onClick ={testLightSquareSequence}>test Lights</button>

        </Fragment>
    )
}

    const Puzzle = (props) =>{
        const [currentPuzzleFromDatabase, setCurrentPuzzleFromDatabase] = useState ([]);
        const [loaded, setLoaded] = useState(false);    

        useEffect(() => {
            const slug = props.match.params.slug
            const url = `/api/v1/puzzles/${slug}`
            console.log(props)
            axios.get(url)
            .then( resp => {
                console.log(resp.data)
                setCurrentPuzzleFromDatabase(resp.data.data[0].attributes)
                setLoaded(true)
            
            })
                
            .catch ( resp => console.log(resp))
       }, [])
       if(loaded)
       {
               
        return <PuzzleInner puzzleDatabasePull={currentPuzzleFromDatabase}/>
    }
       
       {
           return <div>this is the Puzzle view</div>
       }
   
    
    }

export default Puzzle