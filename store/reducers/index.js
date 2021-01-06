import {combineReducers} from 'redux';
import {paramHandler} from './paramReducer'
import {catHandler} from './catReducer'
import {userHandler} from './userReducer'
const rootReducer = combineReducers({
    paramHandler,
    catHandler,
    userHandler
})
export default rootReducer
