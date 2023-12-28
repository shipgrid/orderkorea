import {
  Image,
  Descriptions,
  Button,
  Avatar
} from 'antd'

import {
  Vehicle
} from '../../../services/api'

import '../../../assets/index.css'

interface Image {
  image_url: string;
}

interface VehicleDetailProps {
  vehicle: Vehicle;
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle
}) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <Image.PreviewGroup
        items={
          vehicle.images.map((image: any) => {
            return { src: image.image_url }
          })
        }
        fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
      >
        <Image 
          fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' 
          src={vehicle.images[0]?.image_url} 
          style={{ borderRadius: 25 }}
          width={'100%'}
        />
      </Image.PreviewGroup>

      <div style={{ marginTop: 20 }}>
        <p style={{ fontWeight: 'bold', fontSize: '18px'}}> { vehicle?.year } {vehicle?.make} - {vehicle?.model} - ${vehicle?.price} </p>
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
          <Descriptions.Item label="Mileage">{ vehicle?.mileage }km</Descriptions.Item>
          <Descriptions.Item label="Transmission Type"> { vehicle?.transmission_type }</Descriptions.Item>
          <Descriptions.Item label="Exterior Color"> { vehicle?.exterior_color } </Descriptions.Item>
          <Descriptions.Item label="Fuel Type"> { vehicle?.fuel_type }</Descriptions.Item>
        </Descriptions>
      </div>
      <div>
        <Button type="primary" style={{ marginTop: 20, marginBottom: 20, width: '100%', height: 50, borderRadius: 20 }}> Reserve Now </Button>
      </div>
    </div>
  );
}

export default VehicleDetail
