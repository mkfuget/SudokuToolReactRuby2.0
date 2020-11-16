const BOARD_SQUARES = 81;
const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;

import Util from '../functional/Util.js'

const initialSolverOrder = Array(4*BOARD_SQUARES).fill(0).map(row => Array(2).fill(0));
for(var i=0; i<4*BOARD_SQUARES; i++)
{
    initialSolverOrder[i][0] = 9;
    initialSolverOrder[i][1] = i; 
}
const boardDataReducer = (state =
    {
        entry: Array(BOARD_SQUARES).fill(-1),
        boardHeapIndex: Array(BOARD_SQUARES),
        boardBlocks:  Array(BOARD_SQUARES).fill(0).map(row => Array(BOARD_WIDTH).fill(0)),
        boardNumOptions:  Array(4*BOARD_SQUARES).fill(9),
        solveOrder:  initialSolverOrder,
        heapSize:  4*BOARD_SQUARES,
        puzzleType: 'Not Set'

    }, action) =>
{
    switch(action.type)
    {
        case 'ADD_TO_BOARD_SUCCESSFUL':
            var index = action.index;
            var number = action.number;
            state.entry[index] = action.number;
            state.boardBlocks[index][0] = indexToSquare(index);
            state.boardNumOptions[index] = Util.getSquareHeapIndex(action.index);

            for(var i=0; i<BOARD_SQUARES; i++)
            {
                if(Util.isPlacable(index, number, i, number) === 0 && index !== i)
                {
                    if(state.boardBlocks[i][number] === 0)//we are adding the first blocking square for this index and number
                    {
    
                        var currentSquareIndex = getSquareHeapIndex(i, number);
                        var currentColIndex = getColHeapIndex(i, number);
                        var currentRowIndex = getRowHeapIndex(i, number);
    

                        updateBoardNumOptions(i, -1);
                        updateBoardNumOptions(currentSquareIndex, -1);
                        updateBoardNumOptions(currentColIndex, -1);
                        updateBoardNumOptions(currentRowIndex, -1);
                    }
                    state.boardBlocks[i][number]++;//indicate new squares that now cannot be placed in
                }
            }
    

            return state;
        default: 
            return state;
    }
    function puzzleIsSolved()
    {
        return state.heapSize === 0;
    }

    //Utility Functions to get data about
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

}

export default boardDataReducer;