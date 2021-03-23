

function UPDATE_BOARD(boardData)
{
    const action = {
        type: 'UPDATE_BOARD',
        payload: boardData
    }
    return action;
} 

export default UPDATE_BOARD;