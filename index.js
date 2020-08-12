import React, {useState, useEffect}  from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;
const BOARD_SQUARES = 81;


const orange = [255, 102, 0];
const red = [255, 0, 0];
const green = [0, 255, 0];
var highlightColor = 'rgba(0, 153, 255, 0.1)';

var board = new Array(BOARD_SQUARES);
var boardHeapIndex = new Array(BOARD_SQUARES);
var boardBlocks = new Array(BOARD_SQUARES);
var boardNumOptions = new Array(4*BOARD_SQUARES)
var solveOrder = new Array(BOARD_SQUARES);
var heapSize;
const heapCapacity = BOARD_SQUARES;

for(var i=0; i<BOARD_SQUARES; i++)
{
    boardBlocks[i] = new Array(BOARD_WIDTH);
}
for(var i=0; i<boardNumOptions.length; i++)
{
    solveOrder[i] = new Array(2);
    boardNumOptions[i] = 9;

    solveOrder[i][0] = boardNumOptions[i];
    solveOrder[i][1] = i;
    boardHeapIndex[i] = i;
}
for(var i=0; i<BOARD_SQUARES; i++)
{
    for(var j=0; j<BOARD_WIDTH; j++)
    {
        boardBlocks[i][j]=0; // indicates all spaces are available for placement
    }
} 

function SudokuCell(props) {

      return (
        
        <td 
          className={props.isHighlighted ? "HighlightedCessStyle" : "CellStyle"}
          onClick={props.onClick}
        >
          {props.value}
        </td>
      );
}
  
  
  function Board() {

    const [boardSudokuCells, setSudokuCells] = useState(Array(BOARD_SQUARES).fill(null));
    const [highlightCells, setHighlightCells] = useState(Array(BOARD_SQUARES).fill(false));

    const handleKeyDown = e =>
    {
        const SudokuCells = [...boardSudokuCells];
        SudokuCells[currentIndex] = e.key;
        setSudokuCells(SudokuCells);
    }
    
    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
    
        return () => {
          document.removeEventListener('keydown', handleKeyDown)
        }
      })
    
    const handleClick = index =>
    {
        
        const highlights = [...highlightCells];
        highlights[currentIndex] = false;
        currentIndex = index;
        highlights[currentIndex] = true;
        setHighlightCells(highlights);
    }
    
    const renderSquare = index => {
        
        return (<SudokuCell value ={boardSudokuCells[index]} isHighlighted={highlightCells[index]} onClick={() => handleClick(index)}/>);
    }

      return (
        <table>
        <colgroup><col></col><col></col><col></col></colgroup>
        <colgroup><col></col><col></col><col></col></colgroup>
        <colgroup><col></col><col></col><col></col></colgroup>
    <tbody>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="board-row">
        {renderSquare(9)}
        {renderSquare(10)}
        {renderSquare(11)}
        {renderSquare(12)}
        {renderSquare(13)}
        {renderSquare(14)}
        {renderSquare(15)}
        {renderSquare(16)}
        {renderSquare(17)}
      </div>
      <div className="board-row">
        {renderSquare(18)}
        {renderSquare(19)}
        {renderSquare(20)}
        {renderSquare(21)}
        {renderSquare(22)}
        {renderSquare(23)}
        {renderSquare(24)}
        {renderSquare(25)}
        {renderSquare(26)}
      </div>
    </tbody>
    <tbody>
      <div className="board-row">
        {renderSquare(27)}
        {renderSquare(28)}
        {renderSquare(29)}
        {renderSquare(30)}
        {renderSquare(31)}
        {renderSquare(32)}
        {renderSquare(33)}
        {renderSquare(34)}
        {renderSquare(35)}
      </div>
      <div className="board-row">
        {renderSquare(36)}
        {renderSquare(37)}
        {renderSquare(38)}
        {renderSquare(39)}
        {renderSquare(40)}
        {renderSquare(41)}
        {renderSquare(42)}
        {renderSquare(43)}
        {renderSquare(44)}
      </div>
      <div className="board-row">
        {renderSquare(45)}
        {renderSquare(46)}
        {renderSquare(47)}
        {renderSquare(48)}
        {renderSquare(49)}
        {renderSquare(50)}
        {renderSquare(51)}
        {renderSquare(52)}
        {renderSquare(53)}
      </div>
    </tbody>
    <tbody>
      <div className="board-row">
        {renderSquare(54)}
        {renderSquare(55)}
        {renderSquare(56)}
        {renderSquare(57)}
        {renderSquare(58)}
        {renderSquare(59)}
        {renderSquare(60)}
        {renderSquare(61)}
        {renderSquare(62)}
      </div>
      <div className="board-row">
        {renderSquare(63)}
        {renderSquare(64)}
        {renderSquare(65)}
        {renderSquare(66)}
        {renderSquare(67)}
        {renderSquare(68)}
        {renderSquare(69)}
        {renderSquare(70)}
        {renderSquare(71)}
      </div>
      <div className="board-row">
        {renderSquare(72)}
        {renderSquare(73)}
        {renderSquare(74)}
        {renderSquare(75)}
        {renderSquare(76)}
        {renderSquare(77)}
        {renderSquare(78)}
        {renderSquare(79)}
        {renderSquare(80)}
      </div>
    </tbody>
    </table>
          );
    }
  
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
   
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  