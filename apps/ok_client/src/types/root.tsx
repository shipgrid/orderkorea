// Define the RootState type
export interface SessionState {
  isAuth: boolean;
  user: {
    email: string;
  };
}

export interface RootState {
  session: SessionState;
}
