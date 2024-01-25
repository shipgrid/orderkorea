import React from 'react';

import { 
  Card,
  Typography, 
  Image,
  message,
} from 'antd'

import { 
  DashboardOutlined, 
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

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle, 
  onClick
}) => {

  const { 
    vehicle_id, 
    make, 
    model, 
    exterior_color,
    interior_color,
    trim,
    images,
    fees,
    year, 
    vin_number, 
    mileage, 
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

  const handleCopyToClipboard = (e: any, vinNumber: string) => {
    e.stopPropagation() 
    copyToClipboard(vinNumber)
  }

  return (
    <Card
      style={{ borderRadius: 10}}
      className='inventory-vehicle-card'
      cover={<Image alt={`${make} ${model}`} src={mainImageUrl} preview={false}/>}
      bordered={false}
      onClick={handleItemClick}
      title={
        <div style={{ padding: '32px 8px 5px' }}>
          <div style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap'}}>
            <Text strong style={{ fontSize: 16 }}>{`${year}`} {`${make.name}`}</Text>
            <Text strong style={{ fontSize: 16 }}>USD {`$${formatNumberWithCommas(fees.vehicle_price)}`}</Text>
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
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{exterior_color.name} exterior</Text>
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{interior_color.name} interior</Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              {vin_number ? (<Text style={{ color: '#5c5e62', fontSize: 12 }} onClick={(e) => handleCopyToClipboard(e, vin_number)}> 
                {`VIN: ${vin_number}`}
              </Text>) : null}
              <Text style={{marginTop: 3, color: '#5c5e62', fontSize: 12 }}>{description}</Text>
            </div>
          </div>
        } 
      />
    </Card>
  );
}

export default VehicleCard;