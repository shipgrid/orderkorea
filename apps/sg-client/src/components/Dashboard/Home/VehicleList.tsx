import {
  useNavigate
} from 'react-router-dom'

import { 
  Skeleton, 
  Space 
} from 'antd';

import {
  useGetVehiclesQuery
} from '../../../services/api'

import {
  startTransition
} from 'react';

// import VehicleCard from '../../UI/card/VehicleCard';
import VehicleCard2 from '../../UI/card/VehicleCard2';
import ResourceNotFound from '../../Shared/ResourceNotFound';

interface IFilter {
  makes: string[]; // Assuming 'makes' is an array of strings
  models: string[]; // Assuming 'models' is an array of strings
}

interface VehicleListProps {
  filters: IFilter;
}

const VehicleList = ({ 
  filters 
}: VehicleListProps) => {  

  const navigate = useNavigate();
  const { data: vehicles = [], error, isLoading } = useGetVehiclesQuery({});

  const handleViewVehicle = (vehicleId: number) => {
    navigate(`/vehicle?vehicle_id=${vehicleId}`);
  }

  if (isLoading) {
    return (
      <Space direction="horizontal" size="large" style={{ flex: 1, justifyContent: 'center' }} wrap>
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
        <Skeleton.Button style={{ height: 325, width: 360 }} active />
      </Space>
    );
  }

  if (!vehicles || error) {
    return <ResourceNotFound />;
  }

  return (
    <Space direction="horizontal" size="large" style={{ width: '100%', height: '100%' }} wrap>
      {
        vehicles.length ? vehicles.map((vehicle) => (
          <VehicleCard2 key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => startTransition(() => handleViewVehicle(vehicle.vehicle_id))}/>
        )) : (
        <ResourceNotFound />
      )}
    </Space>
  );
}

export default VehicleList;
