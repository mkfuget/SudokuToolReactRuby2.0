import boardDataReducer from './boardDataReducer';
import flashReducer from './flashReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    boardDataReducer: boardDataReducer
})

export default rootReducer;