import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleDetail from '../VehicleDetail/VehicleDetail';

import {
  useGetVehicleQuery,
} from '../../../services/api';

import ApiLoader from '../../Shared/ApiLoader';

const VehicleDetailContainer = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const vehicleId = searchParams.get('vehicle_id');

  if(!vehicleId) {
    return 'No vehicle id found'
  }
  
  const { data: vehicle, error, isLoading } = useGetVehicleQuery(vehicleId);

  if(!vehicle || isLoading) {
    return <ApiLoader />
  }
  console.log(vehicle)
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
