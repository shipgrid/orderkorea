import { 
  createApi, 
  fetchBaseQuery 
} from '@reduxjs/toolkit/query/react'

interface Vehicle {
  vehicle_id: number;
  make: string;
  model: string;
  year: number;
  description: string;
  exterior_color: string;
  transmission_type: string;
  mileage: number;
  price: number;
  images: Image[];
}

interface Image {
  image_url: string;
}

interface CreateVehicleResponse {
  success: boolean;
  data: number;
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

const vehicleApi = createApi({
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
    getVehicles: build.query({
      query: () => 'vehicles',
      transformResponse: (response: { data: Vehicle[] }) => response.data,
    }),
    getVehicle: build.query<Vehicle, string>({
      query: (vehicleId) => `vehicles/${vehicleId}`,
      transformResponse: (response: { data: Vehicle }) => response.data,
    }),
    createVehicle: build.mutation<CreateVehicleResponse, CreateVehicleParams>({
      query: (body) => ({
        url: `vehicles`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: any }, meta, arg) => response.data,
    })
  }),
})

const { 
  useGetVehiclesQuery, 
  useGetVehicleQuery,
  useCreateVehicleMutation
} = vehicleApi

export {
  vehicleApi,
  useGetVehiclesQuery,
  useGetVehicleQuery,
  useCreateVehicleMutation
}

