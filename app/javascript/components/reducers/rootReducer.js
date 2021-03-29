import boardDataReducer from './boardDataReducer';
import cellStyleReducer from './cellStyleReducer';
import flashReducer from './flashReducer'
import {combineReducers} from 'redux'
import selectionReducer from './selectionReducer';

const rootReducer = combineReducers({
    boardDataReducer: boardDataReducer,
    cellStyleReducer: cellStyleReducer,
    selectionReducer: selectionReducer
})

export default rootReducer;