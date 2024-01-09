import React from 'react';

import { 
  Card,
  List, 
  Typography, 
  Tag, 
  message,
  Image,
} from 'antd'

import { 
  DashboardOutlined, 
  CopyOutlined 
} from '@ant-design/icons'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

const { Meta } = Card;
const { Text } = Typography


interface VehicleCardProps {
  vehicle: {
    vehicle_id: number
    make: string
    model: string
    year: string
    price: string
    mileage: string 
    exterior_color: string 
    interior_color: string 
    transmission_type: string 
    doors: number 
    trim: string 
    drivetrain: string 
    vin_number: string | null 
    is_new: boolean
    fuel_type: string 
    description: string 
    images: {
      image_url: string
    }[]
  },
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
    year, 
    vin_number, 
    mileage, 
    price, 
    description, 
    images 
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
      hoverable
      style={{ maxWidth: 410, minWidth: 320, width: 410 }}
      cover={<img alt={`${make} ${model}`} src={mainImageUrl} />}
      onClick={handleItemClick}
      size='small'
    >
      <Meta 
        title={
          <div>
            <div style={{ fontSize: 12, color: 'gray' }}> {`${year}`}</div>
            <Text strong style={{ flexWrap: 'wrap' }}>{`${make} ${model}`}</Text>
          </div>
        }
        description={
          <div>
            <Tag color="blue" style={{ marginRight: '8px' }}>
              <DashboardOutlined style={{ marginRight: '2px' }}/> {`${mileage.toLocaleString()} KM`}
            </Tag>
            {vin_number && (
              <Tag color="red" style={{ cursor: 'pointer' }} onClick={(e) => {
                e.stopPropagation() 
                copyToClipboard(vin_number)
              }}>
                {`VIN: ${vin_number}`}
                <CopyOutlined 
                  style={{ marginLeft: '8px' }} 
                />
              </Tag>
            )}    
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Text style={{marginTop: 10 }}>{description}</Text>
              <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>
                {`$${formatNumberWithCommas(price)}`}
              </Text>
            </div>
          </div>
        } 
      />
    </Card>
  );
}

export default VehicleCard2;