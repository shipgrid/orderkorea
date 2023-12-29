import { OrderState } from '../../types/root';

// Define the initial state
const initialState: OrderState = {
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

// Define the action type
type SessionAction = {
  type: string;
  payload: {
    token: string;
  }
};

// Define the session reducer
const orderReducer = (state: OrderState = initialState, action: SessionAction): OrderState => {
  switch (action.type) {
    case 'SET_ORDER':    
    console.log(action.payload)
      return { 
        ...state, 
        ...action.payload,
      };

    default:
      return state;
  }
};

export default orderReducer;
