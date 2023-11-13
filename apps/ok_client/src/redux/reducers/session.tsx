import { SessionState } from '../../types/root';

// Define the initial state
const initialState: SessionState = {
  isAuth: false,
  user: {
    email: '',
  },
};

// Define the action type
type SessionAction = {
  type: string;
  payload?: {
    user?: {
      email: string;
    };
  };
};

// Define the session reducer
const sessionReducer = (state: SessionState = initialState, action: SessionAction): SessionState => {
  switch (action.type) {
    case 'LOGIN':
      return { 
        ...state, 
        isAuth: true, 
        user: action.payload?.user || state.user 
      };

    case 'LOGOUT':
      return initialState;

    default:
      return state;
  }
};

export default sessionReducer;
