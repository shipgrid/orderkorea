import {
  Table,
  Button,
  Progress,
  message,
  Image,
} from 'antd'

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

import {
  Vehicle,
  VehicleImage
} from '../../../services/api'

import {
  useDispatch,
} from 'react-redux'

import { 
  useSelector 
} from 'react-redux'

import {
  setOrder
} from '../../../redux/reducers/order'

import TableActionDropdown from '../../Shared/TableActionDropdown';
import VehicleCard from '../../UI/VehicleCard';

const VehicleTable = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order)

  const { 
    data:vehicles, 
    error, 
    isLoading 
  } = useGetVehiclesQuery({});

  const handleViewVehicle = (vehicle_id: number) => {
    startTransition(() => navigate(`/vehicle?vehicle_id=${vehicle_id}`))
  }

  const handleAddToOrder = (vehicle: Vehicle) => {

    const foundVehicle = order.vehicles.find((v: Vehicle) => v.vehicle_id === vehicle.vehicle_id) && message.error('Vehicle already added to order')

    if(foundVehicle) {
      return;
    }

    dispatch(setOrder({ 
      ...order,
      vehicles: [
        ...order.vehicles,
        vehicle
      ]
    }));

    dispatch({
      type: 'SET_ORDER',
      payload: {
        vehicles: [
          ...order.vehicles,
          vehicle
        ]
      }
    })
  }

  return (
    <>
      {vehicles?.length && vehicles.map((vehicle) => <VehicleCard vehicle={vehicle} onClick={handleViewVehicle}/>)}
    </>
  );
}

export default VehicleTable
