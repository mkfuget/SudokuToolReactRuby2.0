import {useSelector, useDispatch} from 'react-redux'
import BoardData from './BoardData'
import UPDATE_BOARD from '../ActionCreators'
//takes the 
export function initializeBoard(boardData)
{
    let addBoard = new BoardData();
    addBoard.addData(boardData);
    const dispatch = useDispatch();
    dispatch(UPDATE_BOARD(boardToStoreHash(board)))
}

function boardToStoreHash(board)
{
    return {
        boardData: board.boardData,
        boardBlocks: board.boardBlocks,
        boardHeapIndex: board.boardHeapIndex,
        boardNumOptions: board.boardNumOptions,
        solveOrder: board.solveOrder,
        heapSize: board.heapSize
    }
}
