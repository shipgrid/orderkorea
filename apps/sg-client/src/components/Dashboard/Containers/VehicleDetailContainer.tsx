import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import { 
  useLocation 
} from 'react-router-dom';

import {
  useGetVehicleQuery,
} from '../../../services/api';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleDetail from '../VehicleDetail/VehicleDetail';
import ApiLoader from '../../Shared/ApiLoader';
import ResourceNotFound from '../../Shared/ResourceNotFound';

const VehicleDetailContainer = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const vehicleId = searchParams.get('vehicle_id');

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
  } = useGetVehicleQuery(vehicleId);

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

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Vehicle Details'}
          description={'View your vehicle details'}
        />
        <Divider my={5}/>
        <Grid
          title={`${vehicle.year} ${vehicle.make} - ${vehicle.model}`}
          content={
            <VehicleDetail
              vehicle={vehicle}
            />
          }
        />
        <Divider my={5}/>
      </DashboardContent>
    </Stack>
  );
}

export default VehicleDetailContainer
