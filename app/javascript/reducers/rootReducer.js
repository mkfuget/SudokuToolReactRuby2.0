import boardIndexReducer from './boardIndexReducer';
import isLoggedReducer from './isLoggedReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    boardIndex: boardIndexReducer,
    isLoggedReducer: isLoggedReducer
})

export default rootReducer;