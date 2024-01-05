import {
  Descriptions,
  Card
} from 'antd'

import {
  Vehicle
} from '../../../services/api'

import '../../../assets/index.css'

import {
  formatNumberWithCommas
} from '../../../utils/format_string'

interface VehicleSpecificationCardProps {
  vehicle: Vehicle
}

const cardStyle = {
  marginTop: 20,
  transition: '0.3s',
  borderRadius: '5px'
}

const VehicleSpecificationsCard: React.FC<VehicleSpecificationCardProps> = ({ vehicle }) => {
  
  const { 
    mileage, 
    exterior_color,
    interior_color,
    transmission_type,
    doors, 
    trim, 
    drivetrain, 
    vin_number, 
    is_new,
    fuel_type, 
  } = vehicle

  return (
    <Card 
      title="Specifications" 
      headStyle={{ borderBottom: 0, opacity: 0.7, fontSize: 16 }}
      style={cardStyle} 
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Mileage">{ formatNumberWithCommas(mileage) } km</Descriptions.Item>
        <Descriptions.Item label="Transmission Type"> { transmission_type } </Descriptions.Item>
        <Descriptions.Item label="Exterior Color"> { exterior_color } </Descriptions.Item>
        <Descriptions.Item label="Interior Color"> { interior_color } </Descriptions.Item>
        <Descriptions.Item label="Fuel Type"> { fuel_type } </Descriptions.Item>
        <Descriptions.Item label="Doors"> { doors } </Descriptions.Item>
        <Descriptions.Item label="Trim"> { trim } </Descriptions.Item>
        <Descriptions.Item label="Drive Train"> { drivetrain } </Descriptions.Item>
        <Descriptions.Item label="Status"> { is_new ? 'New' : 'Used' } </Descriptions.Item>
        <Descriptions.Item label="Vin Number"> { vin_number } </Descriptions.Item>
      </Descriptions>
    </Card>
  )
}

export default VehicleSpecificationsCard