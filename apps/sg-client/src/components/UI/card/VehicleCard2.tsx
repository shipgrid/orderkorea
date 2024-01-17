import React from 'react';

import { 
  Card,
  Typography, 
  Image,
  message,
} from 'antd'

import { 
  DashboardOutlined, 
  CopyOutlined 
} from '@ant-design/icons'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

import {
  Vehicle
} from '../../../services/api'

import '../../../assets/inventory.css'

const { Meta } = Card;
const { Text } = Typography


interface VehicleCardProps {
  vehicle: Vehicle,
  onClick: Function
}

const VehicleCard2: React.FC<VehicleCardProps> = ({
  vehicle, 
  onClick
}) => {

  const { 
    vehicle_id, 
    make, 
    model, 
    transmission,
    exterior_color,
    interior_color,
    trim,
    images,
    fuel_type,
    drivetrain,
    year, 
    vin_number, 
    mileage, 
    price, 
    doors,
    is_new,
    description, 
  } = vehicle

  const mainImageUrl = images[0]?.image_url


  const handleItemClick = () => {
    onClick(vehicle_id)
  }

  const copyToClipboard = (text: any) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success('Vin Copied') 
    }, (err) => {
      console.error('Failed to copy: ', err)
    })
  }

  return (
    <Card
      className='inventory-vehicle-card'
      cover={<Image alt={`${make} ${model}`} src={mainImageUrl} />}
      bordered={false}
      onClick={handleItemClick}
      title={
        <div style={{ paddingTop: 5, paddingBottom: 5, padding: '16px 8px' }}>
          <div style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap'}}>
            <Text strong style={{ fontSize: 16 }}>{`${year}`} {`${make.name}`}</Text>
            <Text strong style={{ fontSize: 16 }}>USD {`$${formatNumberWithCommas(price)}`}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent:'space-between'}}>
            <Text strong style={{ fontSize: 12, color: 'gray' }}>{`${model.name} ${trim.name}`}</Text>
          </div>
          <div style={{ fontSize: 12, color: 'gray', marginTop: 5 }}>
            <DashboardOutlined style={{ marginRight: '2px' }}/> {`${mileage.toLocaleString()} KM`}
          </div>
        </div>
      }
    >
      <Meta 
        description={
          <div className='inventory-vehicle-meta'>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{exterior_color.name}</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{interior_color.name}</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{transmission.name}</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{fuel_type.name}</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{drivetrain.name}</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{doors.name}</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{is_new}</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {vin_number && (<Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}
                onClick={(e) => {
                  e.stopPropagation() 
                  copyToClipboard(vin_number)
                }}
              > 
                {`VIN: ${vin_number}`}
                <CopyOutlined style={{ marginLeft: '8px' }} />
              </Text>)}
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{description}</Text>
            </div>
          </div>
        } 
      />
    </Card>
  );
}

export default VehicleCard2;