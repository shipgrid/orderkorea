import { 
  createApi, 
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

// import {
//   refreshToken
// } from '../redux/reducers/session'

import {
  logout 
} from '../redux/configureStore'

export interface Order {
  order_id: number;
  customer_id: number | null;
  shipment_type: string | null;
  port_of_loading: string | null;
  container_number: string | null;
  port_of_arrival: string | null;
  loaded_on: string | null;
  orderEvents: OrderEvent[];
  thirdParties: ThirdParty[];
  documents: Document[];
  vehicles: Vehicle[];
  expected_arrival: string | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

export interface OrderEvent {
  order_event_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

export interface Vehicle {
  vehicle_id: number;
  make: Make;
  model: Model;
  exterior_color: Color; 
  interior_color: Color; 
  doors: Door; 
  transmission: Transmission; 
  trim: Trim; 
  drivetrain: Drivetrain; 
  fuel_type: FuelType; 
  images: VehicleImage[]
  cylinders: Cylinder,
  body_style: BodyStyle, 
  reservation?: Reservation | null;
  fees: Fee,
  year: string;
  price: string;
  mileage: string; 
  vin_number: string | null; 
  is_new: boolean;
  description: string; 
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

export interface VehicleImage {
  image_url: string;
}

export interface ThirdParty {
  third_party_id: number;
  address_id: number;
  address: Address[];
  order_id: number;
  type: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

export interface Address {
  address_id: number;
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state_code: string;
  country_code: string;
  postal_code: string;
  email: string | null;
  phone: string | null;
  customer_id: number | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

export interface Shipper {
  name: string;
  line1: string;
  countryCode: string;
  stateCode: string;
  city: string;
  postalCode: string;
}

export interface Document {
  document_id: number;
  order_id: number;
  file_url: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

interface ApiResponse {
  success: boolean;
  data: number | string | null;
}

interface CreateDocumentParams {
  order_id: number;
  file: FormData;
}


interface UploadParams {
  file: FormData;
}

interface CreateThirdPartyParams {

}

interface removeThirdPartyParams {
  third_party_id: number;
}

interface removeDocumentParams {
  document_id: number;
  order_id: number;
}

interface CreateVehicleParams {
  make: string;
  model: string;
  year: string;
  mileage: number;
  description: string;
  exterior_color: string;
  transmission_type: string;
  price: number;
  fuel_type: string;
  images: VehicleImage[];
}

interface RegisterParams {
  first_name: string;
  last_name?: string;
  username: string | null | undefined;
  password: string;
}

export interface CreateOrderParams {
  email: number | null;
  shipment_type: string | null;
  port_of_loading: string | null;
  container_number: string | null;
  port_of_arrival: string | null;
  loaded_on: string | null;
  thirdParties: CreateThirdPartyBody[];
  documents: CreateDocumentBody[];
  reservations: CreateReservationBody[];
}

export interface CreateThirdPartyBody {
  address: CreateAddressBody;
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

export interface CreateReservationBody {
  vehicle_id: number;
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

export interface FirebaseLogin {
  firebase_token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface BodyStyle {
  body_style_id: number; 
  name: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Color {
  color_id: number; 
  name: string;
  code: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Cylinder {
  cylinder_id: number; 
  name: string;
  count: number;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Door {
  door_id: number; 
  name: string;
  count: number;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Drivetrain {
  drivetrain_id: number; 
  name: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface FuelType {
  fuel_type_id: number; 
  name: string;
  green: number;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Make {
  make_id: number;
  name: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Model {
  model_id: number; 
  make_id: number;
  name: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Transmission {
  transmission_id: number; 
  name: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Cylinder {
  cylinder_id: number; 
  name: string; 
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Trim {
  trim_id: number; 
  model_id: number;
  name: string;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface BodyStyle { 
  body_style_id: number; 
  name: string; 
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Fee {
  fee_id: number; 
  vehicle_price: number; 
  delivery_fee: number; 
  service_fee: number;
  deposit_fee: number; 
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

export interface Filter {
  makes: Make[],
  models: Model[],
  trims: Trim[],
  fuel_types: FuelType[],
  body_styles: BodyStyle[],
  transmissions: Transmission[],
  doors: Door[],
  colors: Color[],
  drivetrains: Drivetrain[], 
  cylinders: Cylinder[]
}

interface CheckoutResponse {
  client_secret: string;
}

interface CheckoutStatusResponse {
  status: string;
  customer_email: string;
}

export interface Reservation {
  reservation_id: number; 
  vehicle_id: number; 
  customer_id: number; 
  order_id: number; 
  vehicle?: Vehicle;
  created_on?: string;
  updated_on?: string;
  deleted_on?: string | null;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }: any) => {
    const token = getState().session.token

    if(token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
})

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)

  if (result.error && result.error.status === 401) {

    // opportunity to refresh token user 
  
    //REMOVE FIREBASE
    // const refreshResult:any = await baseQuery(`/account/refresh-token`, api, extraOptions)

    // if (refreshResult.data) {
    //   // store the new token
    //   api.dispatch(refreshToken({ 
    //     token: refreshResult.data.data.token
    //   }));
      
    //   result = await baseQuery(args, api, extraOptions)
    // } else {
      api.dispatch(logout())
      window.location.reload();
    // }
  }
  return result
}

const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'orders', 
    'order', 
    'vehicles', 
    'thirdParties', 
    'addresses', 
    'documents', 
    'filters', 
    'checkout',
    'reservations'
  ],
  endpoints: (build) => ({
    login: build.mutation<ApiResponse, Login>({
      query: (body) => ({
        url: 'account/login',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    upload: build.mutation<ApiResponse, UploadParams>({
      query: (body) => ({
        url: 'storage/upload',
        method: 'POST',
        body: body.file,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    register: build.mutation<ApiResponse, RegisterParams>({
      query: (body) => ({
        url: 'account/register',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    checkout: build.query({
      query: (body) => `checkout/${body.vehicle_id}`,
      transformResponse: (response: { data: CheckoutResponse }) => response.data,
      transformErrorResponse: (error: any) => error.data,
      providesTags: ['checkout'],
    }),
    getCheckoutStatus: build.query({
      query: (body) => `checkout/status/${body.sessionId}`,
      transformResponse: (response: { data: CheckoutStatusResponse }) => response.data,
      transformErrorResponse: (error: any) => error.data,
      providesTags: ['checkout'],
    }),
    getOrders: build.query({
      query: () => 'orders',
      transformResponse: (response: { data: Order[] }) => response.data,
      transformErrorResponse: (error: any) => error.data,
      providesTags: ['orders'],
    }),
    getFilters: build.query({
      query: (body) => `filters?${body.finalUrl}`,
      transformResponse: (response: { data: Filter }, _, _args) => response.data,
      providesTags: ['filters']
    }),
    getOrder: build.query({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (response: { data: Order }, _, _args) => response.data,
      providesTags: ['order'],
    }),
    getReservations: build.query({
      query: () => 'reservations',
      transformResponse: (response: { data: Reservation[] }) => response.data,
      transformErrorResponse: (error: any) => error.data,
      providesTags: ['reservations'],
    }),
    updateOrder: build.mutation<ApiResponse, Order>({
      query: (body) => ({
        url: `orders/${body.order_id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    createOrder: build.mutation<ApiResponse, CreateOrderParams>({
      query: (body) => ({
        url: `orders`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    getVehicles: build.query({
      query: (body) => `vehicles?${body.finalUrl}`,
      transformResponse: (response: { data: Vehicle[] }) => response.data.map(item => ({ ...item, key: item.vehicle_id })),
      transformErrorResponse: (error: any) => error.data,
    }),
    getVehicle: build.query<Vehicle, string>({
      query: (vehicleId) => `vehicles/${vehicleId}`,
      transformResponse: (response: { data: Vehicle }) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    createVehicle: build.mutation<ApiResponse, CreateVehicleParams>({
      query: (body) => ({
        url: `vehicles`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    createThirdParty: build.mutation<ApiResponse, CreateThirdPartyParams>({
      query: (body) => ({
        url: `third-parties`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
      invalidatesTags: ['order'],
    }),
    removeThirdParty: build.mutation<ApiResponse, removeThirdPartyParams>({
      query: (body) => ({
        url: `third-parties/${body.third_party_id}`,
        method: 'DELETE',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
      invalidatesTags: ['order'],
    }),
    createDocument: build.mutation<ApiResponse, CreateDocumentParams>({
      query: (body) => ({
        url: `orders/${body.order_id}/documents`,
        method: 'POST',
        body: body.file,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
      invalidatesTags: ['order'],
    }),
    removeDocument: build.mutation<ApiResponse, removeDocumentParams>({
      query: (body) => ({
        url: `orders/${body.order_id}/documents/${body.document_id}`,
        method: 'DELETE',
        body,
      }),
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
      invalidatesTags: ['order'],
    }),
    getAddress: build.query({
      query: (addressId) => `addresses/${addressId}`,
      transformResponse: (response: { data: Address }) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
    updateAddress: build.mutation<ApiResponse, Address>({
      query: (body) => ({
        url: `addresses/${body.address_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['order'],
      transformResponse: (response: { data: any }, _, _args) => response.data,
      transformErrorResponse: (error: any) => error.data,
    }),
  }),
})

const { 
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetVehiclesQuery, 
  useGetVehicleQuery,
  useCreateVehicleMutation,
  useCreateThirdPartyMutation,
  useRemoveThirdPartyMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useUpdateOrderMutation,
  useRemoveDocumentMutation,
  useCreateDocumentMutation,
  useRegisterMutation,
  useUploadMutation,
  useCreateOrderMutation,
  useLoginMutation,
  useGetFiltersQuery,
  useCheckoutQuery,
  useGetCheckoutStatusQuery,
  useGetReservationsQuery
} = api

export {
  api,
  useGetOrderQuery,
  useGetOrdersQuery,
  useGetVehiclesQuery,
  useGetVehicleQuery,
  useCreateVehicleMutation,
  useCreateThirdPartyMutation,
  useRemoveThirdPartyMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useUpdateOrderMutation,
  useRemoveDocumentMutation,
  useCreateDocumentMutation,
  useRegisterMutation,
  useUploadMutation,
  useCreateOrderMutation,
  useLoginMutation,
  useGetFiltersQuery,
  useCheckoutQuery,
  useGetCheckoutStatusQuery,
  useGetReservationsQuery
}

