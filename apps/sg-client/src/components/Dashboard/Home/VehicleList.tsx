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

  const filteredVehicles = vehicles.filter(vehicle => {
    const makeMatch = filters.makes.length === 0 || filters.makes.includes(vehicle.make);
    const modelMatch = filters.models.length === 0 || filters.models.includes(vehicle.model);

    // If there are no models selected, then return all vehicles from the selected makes.
    if (filters.models.length === 0) {
      return makeMatch;
    }

    // If there are no makes selected, then return all vehicles that match the selected models.
    if (filters.makes.length === 0) {
      return modelMatch;
    }

    // If both makes and models are selected, a vehicle should be included if:
    // - its make is selected and it is not one of the models specified in the filters
    // - its model is selected
    return (makeMatch && !filters.models.includes(vehicle.model)) || modelMatch;
  });


  if (isLoading) {
    return (
      <Space direction="horizontal" size="large" style={{ flex: 1, justifyContent: 'center' }} wrap>
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
        <Skeleton.Button style={{ height: 175, width: 360 }} active />
      </Space>
    );
  }

  if (!vehicles || error) {
    return <ResourceNotFound />;
  }

  return (
    <Space direction="horizontal" size="large" style={{ width: '100%' }} wrap>
      {filteredVehicles.length > 0 ? (
        filteredVehicles.map((vehicle) => (
          <VehicleCard2 key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => startTransition(() => handleViewVehicle(vehicle.vehicle_id))}/>
        ))
      ) : (
        <ResourceNotFound />
      )}
    </Space>
  );
}

export default VehicleList;
