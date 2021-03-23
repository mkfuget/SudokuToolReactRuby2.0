const BOARD_SQUARES = 81;
const BOARD_WIDTH = 9;
const SQUARE_WIDTH = 3;

import Util from '../functional/Util.js'


const boardDataReducer = (state =
    {
        data: {
            boardData: Array(BOARD_SQUARES).fill(-1),
        }
    }, action) =>
{
    switch(action.type)
    {
        case 'UPDATE_BOARD':
            return {data: action.payload}
        default: 
            return state;
    }
}

export default boardDataReducer;