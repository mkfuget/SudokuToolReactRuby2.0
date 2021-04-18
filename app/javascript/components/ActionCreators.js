

export function UPDATE_BOARD(boardData)
{
    const action = {
        type: 'UPDATE_BOARD',
        payload: boardData
    }
    return action;
} 

export function UPDATE_BOARD_FAILURE(data)
{
    const action = {
        type: 'UPDATE_BOARD_FAILURE',
        payload: data.blockers,
    }
    return action;
}

export function UPDATE_SELECTION(index)
{
    const action = {
        type: 'UPDATE_SELECTION',
        payload: index
    }
    return action;
}
export function CLEAR_SELECTION(index)
{
    const action = {
        type: 'CLEAR_SELECTION',
    }    
    return action;

}
export function FLASH_SQUARE(index, color)
{
    const action = {
        type: 'FLASH_SQUARE',
        payload: {
            index: index,
            color: color
        }
    }    
    return action;
}

export function ANIMATE_BOARD_ADDITION(index, data)
{
    const action = {
        type: 'ANIMATE_BOARD_ADDITION',
        payload: {
            index: index,
            data: data
        }
    }    
    return action;
}

export function ANIMATE_BOARD_SUBTRACTION(index, data)
{
    const action = {
        type: 'ANIMATE_BOARD_SUBTRACTION',
        payload: {
            index: index,
            data: data
        }
    }    
    return action;
}