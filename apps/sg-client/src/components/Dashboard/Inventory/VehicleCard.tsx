import React from 'react';

import { 
  Card,
  Typography, 
  Image,
  Tag
} from 'antd'

import {
  useSelector
} from 'react-redux'

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
    user_id,
    make, 
    model, 
    created_on,
    is_listed,
    is_sold,
    trim,
    images,
    fees,
    year, 
    mileage, 
  } = vehicle


  const session = useSelector((state: any) => state.session);

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

  const IS_OWNER = user_id === session.userId

  return (
    <Card
      style={{ borderRadius: 10}}
      className='inventory-vehicle-card'
      cover={<Image alt={`${make.name} ${model.name} ${trim.name}`} src={mainImageUrl} preview={false} className='inventory-vehicle-card-image' />}
      bordered={false}
      onClick={handleItemClick}
    >
      <Meta 
        style={{ height: IS_OWNER ? 100 : 80 }}
        description={
          <div style={{ padding: '0px 8px 5px', fontWeight: 'normal' }}>
            {
              IS_OWNER && (
                <div>
                  <Tag color={is_listed ? 'orange' : 'red'}> {is_listed ? 'Listed' : 'Unlisted'} </Tag>
                  <Tag color={is_sold ? 'green' : 'blue'}> {is_sold ? 'Sold' : 'For Sale'} </Tag>
                </div>
              )
            }
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