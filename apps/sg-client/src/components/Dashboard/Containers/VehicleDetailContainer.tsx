import {
  Stack,
} from '@chakra-ui/react'

import { 
  useLocation 
} from 'react-router-dom'

import {
  useGetVehicleQuery,
} from '../../../services/api'

import {
  useSelector
} from 'react-redux'

import DashboardHeader from '../Layout/DashboardHeader'
import DashboardContent from '../Layout/DashboardContent'
import VehicleDetail from '../VehicleDetail/VehicleDetail'
import ApiLoader from '../../Shared/ApiLoader'
import ResourceNotFound from '../../Shared/ResourceNotFound'

const VehicleDetailContainer = () => {
  const location = useLocation()
  const session = useSelector((state: any) => state.session)
  const searchParams = new URLSearchParams(location.search)
  const vehicleId = searchParams.get('vehicle_id')

  if(!vehicleId) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }
  
  const { 
    data: vehicle, 
    error, 
    isLoading 
  } = useGetVehicleQuery(vehicleId)

  if(isLoading) {
    return <ApiLoader />
  }

  if(!vehicle || error) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  const IS_OWNER = vehicle.user_id === session.userId

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={`Vehicle Detail`}
        />
          <VehicleDetail
            vehicle={vehicle}
            isOwner={IS_OWNER}
          />
      </DashboardContent>
    </Stack>
  )
}

export default VehicleDetailContainer
