

function ADD_TO_BOARD_SUCESSFUL(index, number)
{
    const action = {
        type: 'ADD_TO_BOARD_SUCCESSFUL',
        index: index,
        number: number
    }
    return action;
} 

export default ADD_TO_BOARD_SUCESSFUL;