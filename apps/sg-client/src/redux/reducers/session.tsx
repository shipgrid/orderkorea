import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from '../../types/root';

// Define the initial state
const initialState: SessionState = {
  isAuth: false,
  token: '',
  fbToken: '',
  username: '',
  isBroker: false,
  isStaff: false,
};

// Define the session slice using createSlice
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ 
      token: string; 
      username: string;
      isBroker: boolean;
      isStaff: boolean;
    }>) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isBroker = action.payload.isBroker;
      state.isStaff = action.payload.isStaff;
    },
    refreshToken: (state, action: PayloadAction<{ 
      token: string
    }>) => {
      state.token = action.payload.token;
    },
  },
});

// Export actions and reducer from the slice
export const { login, refreshToken } = sessionSlice.actions;
export default sessionSlice.reducer;
