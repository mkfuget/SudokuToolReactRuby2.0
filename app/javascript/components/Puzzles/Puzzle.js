import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./puzzle.css"
const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;
const BOARD_SQUARES = 81;

var currentIndex = -1;

function SudokuCell(props) {

      return (
        
        <td 
          className= "CellStyle"
          style = {{background: props.cellColor}}

          onClick={props.onClick}
        >
          {props.value!==-1 ? props.value : ""}
        </td>
      );
}
  
  
  function Board(props) {

    const orange = [255, 102, 0];
    const red = [255, 0, 0];
    const green = [0, 255, 0];
    const cellColorBlue = 'rgba(0, 153, 255, 0.1)';
    const cellColorWhite = 'white';
    var highlightColor = 'rgba(0, 153, 255, 0.1)';
    const initialState = props.attributes.data;

    const [boardData, setBoard] = useState(Array(BOARD_SQUARES).fill(-1));
    const [boardHeapIndex, setBoardHeapIndex] = useState(Array(BOARD_SQUARES));
    const [boardBlocks, setBoardBlocks] = useState(Array(BOARD_SQUARES).fill(0).map(row => Array(BOARD_WIDTH).fill(0)));
    const [boardNumOptions, setBoardNumOptions] = useState(Array(4*BOARD_SQUARES).fill(0));
    const [solveOrder, setSolveOrder] = useState(Array(4*BOARD_SQUARES).fill(0).map(row => Array(2).fill(0)));
    var [heapSize, setHeapSize] = useState(4*BOARD_SQUARES);
    const heapCapacity = BOARD_SQUARES;

    var initialBoardState = Array(BOARD_SQUARES).fill(-1);

    for(var i=0; i<boardNumOptions.length; i++)
    {

        solveOrder[i][0] = boardNumOptions[i];
        solveOrder[i][1] = i;
        boardHeapIndex[i] = i;
    }

    for(var i=0; i<BOARD_SQUARES; i++)
    {
        if(initialState[i]!= ".")
        {
            var number= parseInt(initialState[i]-1);
            if(addEntry(i, number))
            {
                initialBoardState[i] = number+1;//board sudoku cells stores the actual value printed to the screen
            }
        }
    }

    const [boardSudokuCells, setSudokuCells] = useState(initialBoardState);
    const [cellColors, setCellColors] = useState(Array(BOARD_SQUARES).fill("background:background-color:rgba(255,0,0,0.3)"));
    
    function isPlacable(currentIndex, currentNumber, testIndex, testNumber)
    {
        var currentSquare = indexToSquare(currentIndex);
        var currentCol = indexToCol(currentIndex);
        var currentRow = indexToRow(currentIndex);

        var testSquare = indexToSquare(testIndex);
        var testCol = indexToCol(testIndex);
        var testtRow = indexToRow(testIndex);

        if(currentCol==testCol && currentNumber == testNumber)
        {
            return 0;
        }
        if(currentRow==testtRow && currentNumber == testNumber)
        {
            return 0;
        }
        if(currentSquare==testSquare && currentNumber == testNumber)
        {
            return 0;
        }
        return 1;

    }
    function addEntry(index, number)
    {
        if(boardBlocks[index][number]>0)//placement not allowed on this square
        {
            return false;
        }
        if(boardData[index]!=-1)
        {
            deleteEntry(index);
        }

        for(var i=0; i<BOARD_SQUARES; i++)
        {
            if(isPlacable(index, number, i, number)==0 && index!=i)
            {
                if(boardBlocks[i][number]==0)//we are adding the first blocking square for this index and number
                {
                    updateBoardNumOptions(i, -1);

                    var currentSquareIndex = getSquareHeapIndex(i, number);
                    var currentColIndex = getColHeapIndex(i, number);
                    var currentRowIndex = getRowHeapIndex(i, number);

                    updateBoardNumOptions(currentSquareIndex, -1);
                    updateBoardNumOptions(currentColIndex, -1);
                    updateBoardNumOptions(currentRowIndex, -1);
                }
                boardBlocks[i][number]++;//indicate new squares that now cannot be placed in
            }
        }

        for(var i=0; i<BOARD_WIDTH; i++)//indicate that there is a blocker for each number in the square that is being placed in
        {
            boardBlocks[index][i]++; 
        }

        var addedSquareIndex = getSquareHeapIndex(index, number);
        var addedColIndex = getColHeapIndex(index, number);
        var addedRowIndex = getRowHeapIndex(index, number);

        //remove one from each number that could be placed in the placed square
        for(var i=0; i<BOARD_WIDTH; i++)
        {
            if(boardBlocks[index][i]==0 && i!=number)
            {
                updateBoardNumOptions(addedSquareIndex-number+i, -1);
                updateBoardNumOptions(addedColIndex-number+i, -1);
                updateBoardNumOptions(addedRowIndex-number+i, -1);

            }
        }


        deleteHeapIndex(boardHeapIndex[index]);
        deleteHeapIndex(boardHeapIndex[addedSquareIndex]);
        deleteHeapIndex(boardHeapIndex[addedColIndex]);
        deleteHeapIndex(boardHeapIndex[addedRowIndex]);

        boardData[index] = number;    
        heapify();
        return true;
    }


    function deleteEntry(index)
    {
        var number = boardData[index];
        if(boardData[index]!=-1)
        {
            
            for(var i=0; i<BOARD_SQUARES; i++)
            {
                if(isPlacable(index, number, i, number)==0 && index!=i)
                {
                    if(boardBlocks[i][number]==1)// we are removing the only blocking square for this index, 
                    {
                        updateBoardNumOptions(i, 1);

                        var currentSquareIndex = getSquareHeapIndex(i, number);
                        var currentColIndex = getColHeapIndex(i, number);
                        var currentRowIndex = getRowHeapIndex(i, number);

                        updateBoardNumOptions(currentSquareIndex, 1);
                        updateBoardNumOptions(currentColIndex, 1);
                        updateBoardNumOptions(currentRowIndex, 1);

                    }        
                    boardBlocks[i][number]--;
                }
            }

            for(var i=0; i<BOARD_WIDTH; i++)//indicate that there is a blocker for each number in the square that is being placed in
            {
                boardBlocks[index][i]--;
            }


            for(var i=0; i<BOARD_WIDTH; i++)
            {
                if(boardBlocks[index][i]==1 && i!=number)
                {
                    updateBoardNumOptions(addedSquareIndex-number+i, 1);
                    updateBoardNumOptions(addedColIndex-number+i, 1);
                    updateBoardNumOptions(addedRowIndex-number+i, 1);
                }
            }


            var addedSquareIndex = getSquareHeapIndex(index, number);
            var addedColIndex = getColHeapIndex(index, number);
            var addedRowIndex = getRowHeapIndex(index, number);


            
            boardData[index] = -1;   
            heapPush(boardNumOptions[index], index);
            heapPush(boardNumOptions[addedSquareIndex], addedSquareIndex);
            heapPush(boardNumOptions[addedColIndex], addedColIndex);
            heapPush(boardNumOptions[addedRowIndex], addedRowIndex);

            heapify();
        }
    }


    function updateBoardNumOptions(index, change)
    {
        boardNumOptions[index]+=change;
        var heapIndex = boardHeapIndex[index];
        solveOrder[heapIndex][0] = boardNumOptions[index];
    }
    function solve()
        {
        var choices = [];
        var currentNumberGuess=0;
        while(heapSize>0)
        {
            currentNumberGuess = iterateHeapSolution(choices, currentNumberGuess);
        }
    }
    function iterateHeapSolution(choices, currentNumberGuess)
    {
        var index = heapTop()[1];
        if(currentNumberGuess>=BOARD_WIDTH)   
        {
            var lastChoice = choices.pop();
            var lastChoiceIndex = lastChoice[0];
            var lastChoiceNumber = lastChoice[1];
            //lightUpSquare(lastChoiceIndex, red);
            deleteEntry(lastChoiceIndex);
            currentNumberGuess = lastChoiceNumber[1]+1;
        }
        else if(boardBlocks[index][currentNumberGuess]==0)//placement is allowed
        {
            //lightUpSquare(index, green);
            addEntry(index, currentNumberGuess);
            choices.push([index, currentNumberGuess]);
            currentNumberGuess = 0;
        }
        else
        {
            currentNumberGuess++;
        }
        return currentNumberGuess;
    }
    function lightUpSquares(indices, color)
    {
        var currentOpacity = 0.2;
        var deltaOpacity = 0.1;
        var timer = setInterval(function(){
            currentOpacity += deltaOpacity;
            var colorOpacityString = 'rgb('+color.toString()+',' + currentOpacity+')';
            var colors = [...cellColors];
            for(var i=0; i<indices.length; i++)
            {
                colors[indices[i]] = colorOpacityString;
            }
            setCellColors(colors);
            if(currentOpacity>=0.5)
            {
                deltaOpacity=-0.1;
            }
            if(currentOpacity<=0 && deltaOpacity==-0.1)
            {
                clearInterval(timer);
            }
        }, 100);

    }
    function getSquareHeapIndex(index, number)
    {
        return (BOARD_SQUARES+indexToSquare(index)*BOARD_WIDTH+number);
    }
    function getColHeapIndex(index, number)
    {
        return (2*BOARD_SQUARES+indexToCol(index)*BOARD_WIDTH+number);
    }
    function getRowHeapIndex(index, number)
    {
        return (3*BOARD_SQUARES+indexToRow(index)*BOARD_WIDTH+number);
    }

    function indexToRow(index)
    {
        return Math.floor(index/9);
    }

    function indexToCol(index)
    {
        return Math.floor(index%9);
    }

    function indexToSquare(index)
    {
        return Math.floor(index/(SQUARE_WIDTH)%SQUARE_WIDTH)+Math.floor(index/(BOARD_WIDTH*SQUARE_WIDTH))*SQUARE_WIDTH;
    }
    function right(index)
    {
        return 2*index+2;
    }

    function left(index)
    {
        return 2*index+1;
    }

    function parent(index)
    {
        return Math.floor((index-1)/2);
    }

    function heapPush(value, index)
    {
        if(heapSize==heapCapacity)
        {
            return;
        }
        heapSize++;
        var heapIndex = heapSize-1;
        solveOrder[heapIndex][0] = boardNumOptions[index];
        solveOrder[heapIndex][1] = index;

        boardHeapIndex[index] = heapIndex;
        bubbleUp(heapIndex);
    }

    function heapTop()
    {
    if(heapSize<=0)
    {
        var out = -1;
        return out;
    }
    return solveOrder[0];
    }

    function heapPop()
        {
        if(heapSize<=0)
        {
            var out = -1;
            return out;
        }
        if(heapSize ==1)
        {
            heapSize--;
            return solveOrder[0][1];
        }
        var out = solveOrder[0][1];
        heapSwap(0, heapSize-1);
        heapSize--;
        bubbleDown(0);
        return out;

    }

    function deleteHeapIndex(index)
    {
        heapSwap(index, heapSize-1);
        heapSize--;
        bubbleDown(index);
        }

        function bubbleDown(heapIndex)
        {
        var leftIndex = left(heapIndex);
        var rightIndex = right(heapIndex);
        var child = heapIndex;
        if(leftIndex < heapSize && solveOrder[leftIndex][0] < solveOrder[child][0])
        {
            child = leftIndex;
        }
        if(rightIndex < heapSize && solveOrder[rightIndex][0] < solveOrder[child][0])
        {
            child = rightIndex;
        }
        if(child!=heapIndex)
        {
            heapSwap(heapIndex, child);
            bubbleDown(child);
        }
    }

    function bubbleUp(heapIndex)// cal on index in heap
    {
        while(heapIndex!=0 && solveOrder[parent(heapIndex)][0]>solveOrder[heapIndex][0])
        {
            heapSwap(parent(heapIndex), heapIndex);
            heapIndex=parent(heapIndex);
        }
    }

    function heapSwap(parentHeapIndex, childHeapIndex)
    {
        var parentboardIndex = solveOrder[parentHeapIndex][1];
        var childboardIndex = solveOrder[childHeapIndex][1];

        var temp = solveOrder[parentHeapIndex];
        solveOrder[parentHeapIndex] = solveOrder[childHeapIndex];
        solveOrder[childHeapIndex] = temp;

        boardHeapIndex[parentboardIndex] = childHeapIndex;
        boardHeapIndex[childboardIndex] = parentHeapIndex;

    }

    function heapify()
    {

        for(var i=heapSize; i>=0; i--)
        {
            bubbleDown(i);
        }
    }
    function verifyHeapIntegrity()
    {
        var confirmed = 0;
        var out = "";
        for(var i=0; i<heapSize; i++)
        {
            if(typeof solveOrder[i][0] == 'undefined' || typeof solveOrder[i][1] == 'undefined')
            {
                out += "undefined data in heap"
            }
            if((left(i)<=heapSize && solveOrder[i][0]>solveOrder[left(i)][0]) || (right(i)<=heapSize && solveOrder[i][0]>solveOrder[right(i)][0]))
            {
                out += "heap structure broken";
            }
        }
        return out;
    }    

    function selectEntry(index)
    {
        const colors = [...cellColors];
        if(currentIndex!== index)
        {
            colors[currentIndex] = cellColorWhite;
        }
        currentIndex = index;
        colors[currentIndex] = cellColorBlue;
        setCellColors(colors);
    }

    function deSelectEntry()
    {
        const colors = [...cellColors];
        colors[currentIndex] = cellColorWhite;
        setCellColors(colors);
        currentIndex = -1;
    }

    const handleKeyDown = e =>
    {

        lightUpSquares(orange, 0);
        if(e.key >= 0 && e.key < 9)
        {
            var number = parseInt(e.key);
            if(addEntry(currentIndex, number))
            {
                const SudokuCells = [...boardSudokuCells];
                SudokuCells[currentIndex] = e.key;
                setSudokuCells(SudokuCells);        
            }
            else
            {
                var indices = [];
                for(var i=0; i<BOARD_SQUARES; i++)
                {
                    if(!isPlacable(currentIndex, number, i, boardData[i]) && i!==number)
                    {
                        indices.push(i);
                    }
                }
                lightUpSquares(indices, orange);
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
    
    const renderSquare = index => {
        
        return (<SudokuCell value ={boardSudokuCells[index]} cellColor={cellColors[index]} onClick={() => handleClick(index)}/>);
    }

    return (
        <table className = "BoardTable">
            <tbody>
                <tr className = "BoardRow">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(9)}
                    {renderSquare(10)}
                    {renderSquare(11)}
                    {renderSquare(12)}
                    {renderSquare(13)}
                    {renderSquare(14)}
                    {renderSquare(15)}
                    {renderSquare(16)}
                    {renderSquare(17)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(18)}
                    {renderSquare(19)}
                    {renderSquare(20)}
                    {renderSquare(21)}
                    {renderSquare(22)}
                    {renderSquare(23)}
                    {renderSquare(24)}
                    {renderSquare(25)}
                    {renderSquare(26)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(27)}
                    {renderSquare(28)}
                    {renderSquare(29)}
                    {renderSquare(30)}
                    {renderSquare(31)}
                    {renderSquare(32)}
                    {renderSquare(33)}
                    {renderSquare(34)}
                    {renderSquare(35)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(36)}
                    {renderSquare(37)}
                    {renderSquare(38)}
                    {renderSquare(39)}
                    {renderSquare(40)}
                    {renderSquare(41)}
                    {renderSquare(42)}
                    {renderSquare(43)}
                    {renderSquare(44)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(45)}
                    {renderSquare(46)}
                    {renderSquare(47)}
                    {renderSquare(48)}
                    {renderSquare(49)}
                    {renderSquare(50)}
                    {renderSquare(51)}
                    {renderSquare(52)}
                    {renderSquare(53)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(54)}
                    {renderSquare(55)}
                    {renderSquare(56)}
                    {renderSquare(57)}
                    {renderSquare(58)}
                    {renderSquare(59)}
                    {renderSquare(60)}
                    {renderSquare(61)}
                    {renderSquare(62)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(63)}
                    {renderSquare(64)}
                    {renderSquare(65)}
                    {renderSquare(66)}
                    {renderSquare(67)}
                    {renderSquare(68)}
                    {renderSquare(69)}
                    {renderSquare(70)}
                    {renderSquare(71)}
                </tr>
                <tr className = "BoardRow">
                    {renderSquare(72)}
                    {renderSquare(73)}
                    {renderSquare(74)}
                    {renderSquare(75)}
                    {renderSquare(76)}
                    {renderSquare(77)}
                    {renderSquare(78)}
                    {renderSquare(79)}
                    {renderSquare(80)}
                </tr>
            </tbody>
        </table>
    );
}


const Puzzle = (props) => {

    const [currentPuzzleFromDatabase, setCurrentPuzzleFromDatabase] = useState ([]);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        const slug = props.match.params.slug
        const url = `/api/v1/puzzles/${slug}`
        console.log(props)
        axios.get(url)
        .then( resp => {
            setCurrentPuzzleFromDatabase(resp.data)
            setLoaded(true)
        })
            
        .catch ( resp => console.log(resp))
   }, [])
   console.log(currentPuzzleFromDatabase.data);
   if(loaded)
   {
       return <Board attributes={currentPuzzleFromDatabase.data.attributes} />
   }
   else
   {
        return <div>this is the Puzzle view</div>
   }
}

export default Puzzle