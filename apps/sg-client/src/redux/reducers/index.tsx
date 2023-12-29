import { 
  combineReducers, 
  Reducer 
} from 'redux';

import { 
  SessionState,
  OrderState
} from '../../types/root';

import session from './session'; 
import order from './order'

export interface RootState {
  session: SessionState;
  order: OrderState;
}

const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  session: session,
  order: order
});

export default rootReducer;
