import {
  useNavigate
} from 'react-router-dom'

import { 
  Space,
  Badge,
} from 'antd';

import {
  Vehicle,
} from '../../../services/api'

import {
  startTransition
} from 'react';

import VehicleCard from './VehicleCard';
import NoMatches from '../../Shared/NoMatches';
import '../../../assets/request_car.css';

interface VehicleListProps {
  vehicles: Vehicle[];
  extra: React.ReactNode;
}

const VehicleList = ({ 
  vehicles,
  extra
}: VehicleListProps) => {  

  const navigate = useNavigate();

  const handleViewVehicle = (vehicleId: number) => {
    navigate(`/vehicle?vehicle_id=${vehicleId}`);
  }

  return (
    <Space direction="horizontal" size="large" wrap>
      <div style={{ width: '100%'}}>
        {extra}
      </div>
      {
        vehicles.length ? (
          vehicles.map((vehicle, index) => (
          <div key={index}>
            <Badge.Ribbon text={vehicle.order_id ? 'in negotiation' : 'available' } color={vehicle.order_id ? 'red' : 'green'}>
              <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => startTransition(() => handleViewVehicle(vehicle.vehicle_id))}/>
            </Badge.Ribbon>
          </div>)
        )) : (
        <div className='no-match-vehicle-card'>
          <NoMatches />
        </div>
      )}
    </Space>
  );
}

export default VehicleList;
