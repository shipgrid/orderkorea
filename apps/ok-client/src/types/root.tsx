// Define the RootState type
export interface SessionState {
  isAuth: boolean;
  token: string;
}

export interface RootState {
  session: SessionState;
}
