import { 
  createApi, 
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

import firebase from 'firebase/compat/app'

import {
  refreshToken
} from '../redux/reducers/session'

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
  make: string;
  model: string;
  year: string;
  price: string;
  mileage: string; 
  exterior_color: string; 
  interior_color: string; 
  transmission_type: string; 
  doors: number; 
  trim: string; 
  drivetrain: string 
  vin_number: string | null; 
  is_new: boolean;
  fuel_type: string; 
  description: string; 
  images: VehicleImage[]
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
  uid: string | null | undefined;
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
  vehicles: CreateVehicleBody[];
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
const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers, { getState }: any) => {
    const fbToken = getState().session.fbToken
    const token = getState().session.token

    if (fbToken) {
      headers.set('authorization', `Bearer ${token}`)
      headers.set('x-fb-key', `${fbToken}`)
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

    const firebaseToken = await firebase.auth().currentUser?.getIdToken()
    
    if(!firebaseToken) {
      return result;
    } 

    const refreshResult:any = await baseQuery(`/account/refresh-token/${firebaseToken}`, api, extraOptions)

    if (refreshResult.data) {
      // store the new token
      api.dispatch(refreshToken({ 
        fbToken: firebaseToken,
        token: refreshResult.data.data.token
      }));
      
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      //need to log out user here
      // api.dispatch(loggedOut())
    }
  }
  return result
}

const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['orders', 'order', 'vehicles', 'thirdParties', 'addresses', 'documents'],
  endpoints: (build) => ({
    firebaseLogin: build.mutation<ApiResponse, FirebaseLogin>({
      query: (body) => ({
        url: 'account/firebase-login',
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
    getOrders: build.query({
      query: () => 'orders',
      transformResponse: (response: { data: Order[] }) => response.data,
      transformErrorResponse: (error: any) => error.data,
      providesTags: ['orders'],
    }),
    getOrder: build.query({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (response: { data: Order }, _, _args) => response.data,
      providesTags: ['order'],
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
      query: () => 'vehicles',
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
  useFirebaseLoginMutation
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
  useFirebaseLoginMutation
}

