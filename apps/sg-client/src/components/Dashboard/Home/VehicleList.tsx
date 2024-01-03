import {
  Skeleton
} from 'antd'

import {
  Stack,
} from '@chakra-ui/react';

import '../../../assets/index.css'

import {
  startTransition
} from 'react';

import { 
  useNavigate 
} from 'react-router-dom'

import {
  useGetVehiclesQuery
} from '../../../services/api';

import VehicleCard from '../../UI/VehicleCard';
import ResourceNotFound from '../../Shared/ResourceNotFound';

const VehicleTable = () => {

  const navigate = useNavigate();

  const { 
    data:vehicles, 
    error, 
    isLoading 
  } = useGetVehiclesQuery({});

  const handleViewVehicle = (vehicle_id: number) => {
    startTransition(() => navigate(`/vehicle?vehicle_id=${vehicle_id}`))
  }

  if(isLoading) {
    return  (
    <Stack minH={'100vh'}>
      <Skeleton.Button style={{ width: '100%', height: 175 }} active/>
      <Skeleton.Button style={{ width: '100%', height: 175 }} active/>
      <Skeleton.Button style={{ width: '100%', height: 175 }} active/>
      <Skeleton.Button style={{ width: '100%', height: 175 }} active/>
      <Skeleton.Button style={{ width: '100%', height: 175 }} active/>
      <Skeleton.Button style={{ width: '100%', height: 175 }} active/>
    </Stack>)
  }

  if(!vehicles || error) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  return (
    <>
      {vehicles?.length && vehicles.map((vehicle) => <VehicleCard vehicle={vehicle} onClick={handleViewVehicle}/>)}
    </>
  );
}

export default VehicleTable
