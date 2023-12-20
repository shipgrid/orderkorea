import { 
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react'

interface Order {
  order_id: number;
  customer_id: number | null;
  port_of_loading: string | null;
  container_number: string | null;
  port_of_arrival: string | null;
  loaded_on: string | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
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
  tagTypes: ['vehicles'],
  endpoints: (build) => ({
    getOrders: build.query({
      query: () => 'orders',
      transformResponse: (response: { data: Order[] }) => response.data,
    }),
    getOrder: build.query({
      query: (orderId) => `orders/${orderId}`,
      transformResponse: (response: { data: Order[] }) => response.data,
    }),
  }),
})

const { 
  useGetOrderQuery,
  useGetOrdersQuery,
} = api

export {
  api,
  useGetOrderQuery,
  useGetOrdersQuery,
}

