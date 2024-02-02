export interface CreateThirdPartyBody {
  address: CreateAddressBody;
  order_id: number;
  type: string;
}

export interface CreateAddressBody {
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state_code: string;
  country_code: string;
  postal_code: string;
  email: string | null;
  phone: string | null;
}

export interface CreateDocumentBody {
  file_url: number;
}

export interface CreateVehicleBody {
  make: string;
  model: string;
  year: number;
  description: string;
  exterior_color: string;
  transmission_type: string;
  mileage: number;
  price: number;
  fuel_type: string;
  images: VehicleImage[];
}

export interface VehicleImage {
  image_url: string;
}

export interface OrderState {
  email: number | null;
  shipment_type: string | null;
  port_of_loading: string | null;
  container_number: string | null;
  port_of_arrival: string | null;
  loaded_on: string | null;
  thirdParties: CreateThirdPartyBody[];
  documents: CreateDocumentBody[];
  reservations: Reservation[];
}

export interface Reservation {
  reservation_id: number; 
  vehicle_id: number; 
  customer_id: number; 
  order_id: number; 
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface SessionState {
  isAuth: boolean;
  token: string;
  userId: string | null;
  username: string;
  isBroker: boolean;
  isStaff: boolean;
}

export interface RootState {
  session: SessionState;
}

