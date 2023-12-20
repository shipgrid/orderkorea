import { combineReducers, Reducer } from 'redux';
import session from './session'; // Import your session reducer and SessionState type
import { SessionState } from '../../types/root';
// Define the root state interface that combines all individual state types
export interface RootState {
  session: SessionState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  session: session,
});

export default rootReducer;
