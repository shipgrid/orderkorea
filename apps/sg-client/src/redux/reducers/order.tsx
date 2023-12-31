import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderState } from '../../types/root';

// Define the initial state
const initialState: OrderState = {
  status: 'in_progress', // 'in_progress' | 'completed' | 'cancelled
  email: null,
  shipment_type: null,
  port_of_loading: null,
  container_number: null,
  port_of_arrival: null,
  loaded_on: null,
  thirdParties: [],
  documents: [],
  vehicles: [],
};

// Create a slice for the order state and reducers
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<OrderState>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setOrder } = orderSlice.actions;
export default orderSlice.reducer;
