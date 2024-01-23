import {
  useNavigate
} from 'react-router-dom'

import { 
  Skeleton, 
  Space,
  Badge
} from 'antd';

import {
  Vehicle,
} from '../../../services/api'

import {
  startTransition
} from 'react';

import VehicleCard from '../Inventory/VehicleCard';
import NoMatches from '../../Shared/NoMatches';

interface VehicleListProps {
  vehicles: Vehicle[];
  isLoading: boolean;
}

const VehicleList = ({ 
  vehicles,
  isLoading
}: VehicleListProps) => {  

  const navigate = useNavigate();

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
      </Space>
    );
  }

  if (!vehicles) {
    return <NoMatches />;
  }

  return (
    <Space direction="horizontal" size="large" style={{ width: '100%', height: '100%' }} wrap>
      {
        vehicles.length ? vehicles.map((vehicle) => (
          <Badge.Ribbon text={vehicle.reservation ? 'sold' : 'available' } color={vehicle.reservation ? 'red' : 'green'}>
            <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => startTransition(() => handleViewVehicle(vehicle.vehicle_id))}/>
          </Badge.Ribbon>
        )) : (
        <div style={{ 
          flex: 1, 
          border: '1px solid #d9d9d9',
          maxWidth: '100%'
        }}>
          <NoMatches />
        </div>
      )}
    </Space>
  );
}

export default VehicleList;
