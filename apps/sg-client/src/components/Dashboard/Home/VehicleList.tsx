import { 
  Skeleton, 
  Space 
} from 'antd';

import { 
  useNavigate 
} from 'react-router-dom';

import { 
  useGetVehiclesQuery 
} from '../../../services/api';

import VehicleCard from '../../UI/VehicleCard';
import ResourceNotFound from '../../Shared/ResourceNotFound';

const VehicleList = ({ 
  filters 
}) => {  

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
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Skeleton.Button style={{ width: '100%', height: 175 }} active />
        <Skeleton.Button style={{ width: '100%', height: 175 }} active />
        <Skeleton.Button style={{ width: '100%', height: 175 }} active />
        <Skeleton.Button style={{ width: '100%', height: 175 }} active />
        <Skeleton.Button style={{ width: '100%', height: 175 }} active />
        <Skeleton.Button style={{ width: '100%', height: 175 }} active />
      </Space>
    );
  }

  if (!vehicles || error) {
    return <ResourceNotFound />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {filteredVehicles.length > 0 ? (
        filteredVehicles.map((vehicle) => (
          <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle} onClick={() => handleViewVehicle(vehicle.vehicle_id)} />
        ))
      ) : (
        <ResourceNotFound />
      )}
    </Space>
  );
}

export default VehicleList;
