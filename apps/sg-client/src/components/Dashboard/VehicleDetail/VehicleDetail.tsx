import {
  Image,
  Descriptions,
  Button,
  Avatar
} from 'antd'

import { useLocation } from 'react-router-dom';

import {
  useGetVehicleQuery,
} from '../../../services/api';

import '../../../assets/index.css'

interface Image {
  image_url: string;
}

const VehicleDetail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const vehicleId = searchParams.get('vehicle_id');

  if(!vehicleId) {
    return 'No vehicle id found'
  }
  
  const { data: vehicle, error, isLoading } = useGetVehicleQuery(vehicleId);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Image
        style={{ borderRadius: 25}}
        width={'100%'}
        src="https://ci.encar.com/carpicture/carpicture03/pic3593/35931075_001.jpg?impolicy=heightRate&rh=480&cw=640&ch=480&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_03.png&t=20230912193136"
      />
      <div style={{ marginTop: 20 }}>
        <p style={{ fontWeight: 'bold', fontSize: '18px'}}> { vehicle?.year } {vehicle?.make} - {vehicle?.model} - $9,500 </p>
        <p style={{ fontSize: '14px'}}> December 25 - {vehicle?.mileage}km - Gasoline </p>
        <div style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00', marginRight: 10 }}>BL</Avatar> 
          <p> Posted by Brain Lee </p>
        </div>
      </div>
      <div style={{ marginTop: 20 }}>
        <p style={{ fontSize: '14px'}}>  
          {vehicle?.description}
        </p>
      </div>
      <div style={{ marginTop: 20 }}>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Mileage">59,728km</Descriptions.Item>
          <Descriptions.Item label="Transmission Type">Automatic</Descriptions.Item>
          <Descriptions.Item label="Exterior Color">Black</Descriptions.Item>
          <Descriptions.Item label="Fuel Type">Gasoline</Descriptions.Item>
        </Descriptions>
      </div>
      <div>
        <Button type="primary" style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 50, borderRadius: 20 }}> Reserve Now </Button>
      </div>
    </div>
  );
}

export default VehicleDetail
