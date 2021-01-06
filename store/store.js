import {applyMiddleware,createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers/index'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;