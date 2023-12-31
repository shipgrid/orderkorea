import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SessionState } from '../../types/root';

// Define the initial state
const initialState: SessionState = {
  isAuth: false,
  token: '',
  fbToken: '',
  username: '',
  isCustomer: false,
  isStaff: false,
};

// Define the session slice using createSlice
const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ 
      token: string; 
      fbToken: string;
      username: string;
      isCustomer: boolean;
      isStaff: boolean;
    }>) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.fbToken = action.payload.fbToken;
      state.username = action.payload.username;
      state.isCustomer = action.payload.isCustomer;
      state.isStaff = action.payload.isStaff;
    },
    refreshToken: (state, action: PayloadAction<{ 
      fbToken: string,
      token: string
    }>) => {
      state.fbToken = action.payload.fbToken;
      state.token = action.payload.token;
    },
  },
});

// Export actions and reducer from the slice
export const { login, refreshToken } = sessionSlice.actions;
export default sessionSlice.reducer;
