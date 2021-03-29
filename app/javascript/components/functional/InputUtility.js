import {useSelector, useDispatch} from 'react-redux'
import BoardData from './BoardData'
import * as Action from '../ActionCreators'
import axios from 'axios'
import anime from 'animejs/lib/anime.es.js';
import Board from '../Board/Board';

//takes the 
export const fetchBoardData = (url) =>
{
    return async dispatch => {
        try {
            let data = await axios.get(url)
            let addBoard = new BoardData();
            const boardData = data.data.data[0].attributes.data;
            addBoard.addData(boardData);
            console.log(data);
            dispatch(Action.UPDATE_BOARD(boardToStoreHash(addBoard)))
        }
        catch(e){
        }
    }
}

export function selectCell(index) 
{
    const dispatch = useDispatch();
    const currentSelectionIndex = useSelector(state => state.selectionReducer).index;
    
    return () =>
    {       
    
        if(index!==currentSelectionIndex)
        {
            dispatch(Action.UPDATE_SELECTION(index))
        }
        else 
        {
            dispatch(Action.CLEAR_SELECTION())
        }
    }
}

export function processKeyPress(e, stateData, index)
{
    if(index!== -1)
    {
        let number = 0;
        if ((e.keyCode >= 48 && e.keyCode <= 57 )|| (e.keyCode >= 96 && e.keyCode <= 105))
        {
            if (e.keyCode >= 48 && e.keyCode <= 57)
            {
                number = parseInt(e.keyCode) - 48 - 1;
            }
            else if(e.keyCode >= 96 && e.keyCode <= 105)
            {
                number = parseInt(e.keyCode) - 96 - 1;
            }
    
            console.log(number);
        
        
            let addBoard = new BoardData();
            addBoard.addDataHash(stateData);
            const output = addBoard.addEntry(index, number)
        
            console.log(output);
            console.log(stateData);
        
            return Action.UPDATE_BOARD(boardToStoreHash(addBoard))
        }
    }
    return {
        type: "NO_RESPONSE_RECORDED"
    }

}
const boardToStoreHash = (board) =>
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
