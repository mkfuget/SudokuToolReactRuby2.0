import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './components/reducers/rootReducer'

//code to setup redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sudokuStore = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

export default sudokuStore
