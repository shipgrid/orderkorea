import {
  useNavigate
} from 'react-router-dom'

import { 
  Skeleton, 
  Space,
  Badge,
  Image,
  Button
} from 'antd';

import {
  Vehicle,
} from '../../../services/api'

import {
  startTransition
} from 'react';

import VehicleCard from '../Inventory/VehicleCard';
import NoMatches from '../../Shared/NoMatches';
import PricePana from '../../../assets/images/price-pana.png';
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

  if (!vehicles) {
    return <NoMatches />;
  }

  return (
    <Space direction="horizontal" size="large" style={{ width: '100%', height: '100%' }} wrap>
      <div className='request-car-card'>
        <div className='request-car-content'>
          <Image src={PricePana} preview={false} className='request-car-hero'/>
          <div>
            <div style={{ fontWeight: 600, fontSize: 24, margin: '12px 0px' }}>Can't find the car you want?</div>
            <div style={{ fontWeight: 400, fontSize: 16, margin: '12px 0px' }}>Access Shipgrid's extensive broker network to get the best offers on your what you're looking for</div>
            <Button type='primary' style={{ width: '100%', height: 45, margin: '12px 0px' }}>Request for a Car</Button>
          </div>
        </div>
      </div>
      {
        vehicles.length ? (
          vehicles.map((vehicle, index) => (
          <div key={index}>
            <Badge.Ribbon text={vehicle.reservation ? 'sold' : 'available' } color={vehicle.reservation ? 'red' : 'green'}>
              <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => startTransition(() => handleViewVehicle(vehicle.vehicle_id))}/>
            </Badge.Ribbon>
          </div>)
        )) : (
        <div style={{ 
          flex: 1, 
          border: '1px solid #d9d9d9',
          width: 475,
          height: 560,
          borderRadius: 10, 
        }}>
          <NoMatches />
        </div>
      )}
    </Space>
  );
}

export default VehicleList;
