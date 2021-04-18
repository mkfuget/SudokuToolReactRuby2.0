const BOARD_SQUARES = 81;

const selectionReducer = (state =
    {
        index: -1,
    }, action) =>
{
    switch(action.type)
    {
        case 'UPDATE_SELECTION':
            return {index: action.payload}
        case 'CLEAR_SELECTION':
            return {index: -1}
        case 'UPDATE_BOARD':
            return {index: -1}
        default: 
            return state;
    }
}

export default selectionReducer;