import { combineReducers } from 'redux';
import counterReducer from '../features/counter/counterSlice';
import boardReducer from '../features/boards/reducer';

export default combineReducers({
  counterReducer,
  boardReducer
})