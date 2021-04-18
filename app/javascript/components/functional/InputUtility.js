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
            console.log(addBoard);

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

export function solvePuzzle(stateData)
{
    const dispatch = useDispatch();

    return () => 
    {
        let addBoard = new BoardData();
        addBoard.addDataHash(stateData);
        const output = addBoard.solvePuzzle();
        let i =0;
        let interval = setInterval(iterateDispatch, 400)
        function iterateDispatch() {

            const index = output[i].index;
            const number = output[i].number;
            switch(output[i].stepTaken)
            {
                case "Added":
                    addBoard.addEntry(index, number);
                    dispatch(Action.ANIMATE_BOARD_ADDITION(index, boardToStoreHash(addBoard)))
                    break;
                case "Removed":
                    addBoard.deleteEntry(index, number);
                    dispatch(Action.ANIMATE_BOARD_SUBTRACTION(index, boardToStoreHash(addBoard)))
                    break;
    
            }
            i++;
            if(i>output.length)
            {
                clearInterval(interval);
            }
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
    
        
        
            let addBoard = new BoardData();
            addBoard.addDataHash(stateData);
            const output = addBoard.addEntry(index, number)
            if(output.type === "Failure")
            {
                return Action.UPDATE_BOARD_FAILURE(output)

            }
        
            return Action.UPDATE_BOARD(boardToStoreHash(addBoard))
        }
        else if(e.keyCode === 46)
        {
            let addBoard = new BoardData();
            addBoard.addDataHash(stateData);
            const output = addBoard.deleteEntry(index)

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
        confirmedSquares: board.confirmedSquares,
        boardBlocks: board.boardBlocks,
        boardHeapIndex: board.boardHeapIndex,
        boardNumOptions: board.boardNumOptions,
        solveOrder: board.solveOrder,
        heapSize: board.heapSize
    }
}
