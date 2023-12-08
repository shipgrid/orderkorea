import { combineReducers, Reducer } from 'redux';
import session, { SessionState } from './session'; // Import your session reducer and SessionState type

// Define the root state interface that combines all individual state types
export interface RootState {
  session: SessionState;
}

const rootReducer: Reducer<RootState> = combineReducers({
  session,
});

export default rootReducer;
