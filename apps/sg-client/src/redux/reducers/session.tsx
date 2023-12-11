import { SessionState } from '../../types/root';

// Define the initial state
const initialState: SessionState = {
  isAuth: false,
  token: ''
};

// Define the action type
type SessionAction = {
  type: string;
  payload: {
    token: string;
  }
};

// Define the session reducer
const sessionReducer = (state: SessionState = initialState, action: SessionAction): SessionState => {
  switch (action.type) {
    case 'LOGIN':      
      return { 
        ...state, 
        isAuth: true, 
        token: action.payload.token
      };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};

export default sessionReducer;
