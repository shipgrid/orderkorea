import { 
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react'

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

export interface ThirdParty {
  third_party_id: number;
  address_id: number;
  address: Address;
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
}

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000',
    prepareHeaders: (headers, { getState }: any) => {
      const token = getState().session.token

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  tagTypes: ['orders', 'order', 'vehicles', 'thirdParties', 'addresses', 'documents'],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => 'orders',
      transformResponse: (response: { data: Order[] }) => response.data,
      providesTags: ['orders'],
    }),
    getOrder: build.query({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (response: { data: Order }) => response.data,
      providesTags: ['order'],
    }),
    updateOrder: build.mutation<ApiResponse, Order>({
      query: (body) => ({
        url: `orders/${body.order_id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    getVehicles: build.query({
      query: () => 'vehicles',
      transformResponse: (response: { data: Vehicle[] }) => response.data,
    }),
    getVehicle: build.query<Vehicle, string>({
      query: (vehicleId) => `vehicles/${vehicleId}`,
      transformResponse: (response: { data: Vehicle }) => response.data,
    }),
    createVehicle: build.mutation<ApiResponse, CreateVehicleParams>({
      query: (body) => ({
        url: `vehicles`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    }),
    createThirdParty: build.mutation<ApiResponse, CreateThirdPartyParams>({
      query: (body) => ({
        url: `third-parties`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: ['order'],
    }),
    removeThirdParty: build.mutation<ApiResponse, removeThirdPartyParams>({
      query: (body) => ({
        url: `third-parties/${body.third_party_id}`,
        method: 'DELETE',
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: ['order'],
    }),
    createDocument: build.mutation<ApiResponse, CreateDocumentParams>({
      query: (body) => ({
        url: `orders/${body.order_id}/documents`,
        method: 'POST',
        body: body.file,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: ['order'],
    }),
    removeDocument: build.mutation<ApiResponse, removeDocumentParams>({
      query: (body) => ({
        url: `orders/${body.order_id}/documents/${body.document_id}`,
        method: 'DELETE',
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
      invalidatesTags: ['order'],
    }),
    getAddress: build.query({
      query: (addressId) => `addresses/${addressId}`,
      transformResponse: (response: { data: Address }) => response.data,
    }),
    updateAddress: build.mutation<ApiResponse, Address>({
      query: (body) => ({
        url: `addresses/${body.address_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['order'],
      transformResponse: (response: { data: any }, meta, arg) => response.data,
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
  useCreateDocumentMutation
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
  useCreateDocumentMutation
}

