import {
  useNavigate
} from 'react-router-dom'

import { 
  Skeleton, 
  Space,
  Badge,
  Button
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

  return (
    <Space direction="horizontal" size="large" style={{ width: '100%', height: '100%' }} wrap>
      <div className='request-car-card'>
        <div className='request-car-content'>
          <div>
            <div style={{ fontWeight: 600, fontSize: 24, margin: '12px 0px' }}>Can't find the car you want?</div>
            <div style={{ fontWeight: 400, fontSize: 16, margin: '12px 0px', color: '#5c5e62' }}>Access the broker network to leverage the best offers that match your desired margins</div>
            <a
              href="https://forms.gle/3q6pTTMdCXxcQK4W6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button type='primary' style={{ width: '100%', height: 45, margin: '12px 0px' }}>
                Find a broker
              </Button>
            </a>
          </div>
        </div>
      </div>
      {
        vehicles.length ? (
          vehicles.map((vehicle, index) => (
          <div key={index}>
            <Badge.Ribbon text={vehicle.order_id ? 'sold' : 'available' } color={vehicle.order_id ? 'red' : 'green'}>
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
