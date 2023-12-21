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
  tagTypes: ['orders'],
  endpoints: (build) => ({
    getOrders: build.query<Order[], { customer_id: number }>({
      query: ({ customer_id }) => `orders/${customer_id}`,
      transformResponse: (response: { data: Order[] }) => response.data,
    }),
  }),
})

const { 
  useGetOrdersQuery,
} = api

export {
  api,
  useGetOrdersQuery,
}

