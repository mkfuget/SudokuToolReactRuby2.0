const boardIndexReducer = (state = -1, action) => {
    switch(action.type){
        case "NEW_INDEX":
            return state = action.index;
        default:
            return state = -1;
            
    }
}
export default boardIndexReducer