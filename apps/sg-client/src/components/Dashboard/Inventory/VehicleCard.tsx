import React from 'react';

import { 
  Card,
  Typography, 
  Image,
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
    created_on,
    trim,
    images,
    fees,
    year, 
    mileage, 
  } = vehicle

  const mainImageUrl = images[0]?.image_url

  const handleItemClick = () => {
    onClick(vehicle_id)
  }

  const calculateDaysDifference = (timestampString: string): number => {
    const timestampDate = new Date(timestampString); 
    const currentDate = new Date(); 
    const timeDifference = currentDate.getTime() - timestampDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 

    if (daysDifference < 0) {
      return 0;
    }

    return daysDifference;
  }

  return (
    <Card
      style={{ borderRadius: 10}}
      className='inventory-vehicle-card'
      cover={<Image alt={`${make.name} ${model.name} ${trim.name}`} src={mainImageUrl} preview={false} className='inventory-vehicle-card-image' />}
      bordered={false}
      onClick={handleItemClick}
    >
      <Meta 
        style={{ height: 80 }}
        description={
          <div style={{ padding: '0px 8px 5px', fontWeight: 'normal' }}>
            <div style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap'}}>
              <div style={{ display: 'flex'}}> 
                {calculateDaysDifference(created_on) <= 0 ? <span style={{ margin: '0px 0px 0px 0px'}}> posted now </span> : <span style={{ margin: '0px 0px 0px 0px'}}> posted {calculateDaysDifference(created_on)} days ago </span> }
              </div>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>USD {`$${formatNumberWithCommas(fees.vehicle_price)}`}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent:'space-between', marginTop: 5 }}>
              <Text style={{ fontSize: 16 }}>{`${year}`} {`${make.name}`}</Text>
              <Text style={{ fontSize: 14, color: 'gray' }}>{`${model.name} ${trim.name}`}</Text>
            </div>
            <div style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
              <DashboardOutlined style={{ marginRight: '2px' }}/> {`${mileage.toLocaleString()} KM`}
            </div>
          </div>
        } 
      />
    </Card>
  );
}

export default VehicleCard;