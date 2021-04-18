const BOARD_SQUARES = 81;

const boardDataReducer = (state =
    {
        data: {
            boardData: Array(BOARD_SQUARES).fill(-1),
            confirmedSquares: Array(BOARD_SQUARES).fill(false),

        }
    }, action) =>
{
    switch(action.type)
    {
        case 'UPDATE_BOARD':
            return {data: action.payload}
        case 'ANIMATE_BOARD_ADDITION':
            return {data: action.payload.data}
        case 'ANIMATE_BOARD_SUBTRACTION':
            return {data: action.payload.data}
    
        default: 
            return state;
    }
}

export default boardDataReducer;