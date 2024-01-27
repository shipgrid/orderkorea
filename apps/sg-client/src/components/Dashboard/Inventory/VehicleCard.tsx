import React from 'react';

import { 
  Card,
  Typography, 
  Image,
  message,
  Avatar
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
    vin_number, 
    mileage, 
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


  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 
  
    const color = `rgb(${r},${g},${b})`;
  
    return color;
  }

  const getRandomLetter = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    return randomLetter.toUpperCase();
  }

  const calculateDaysDifference = (timestampString: string): number => {
    const timestampDate = new Date(timestampString); // Convert the timestamp string to a Date object
    const currentDate = new Date(); // Get the current date
    const timeDifference = currentDate.getTime() - timestampDate.getTime(); // Calculate the time difference in milliseconds
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    if (daysDifference < 0) {
      return 0;
    }

    return daysDifference;
  }

  return (
    <Card
      style={{ borderRadius: 10}}
      className='inventory-vehicle-card'
      cover={<Image alt={`${make} ${model}`} src={mainImageUrl} preview={false}/>}
      bordered={false}
      onClick={handleItemClick}
      title={
        <div style={{ padding: '32px 8px 5px', fontWeight: 'normal' }}>
          <div style={{ display: 'flex', justifyContent:'space-between', flexWrap: 'wrap'}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{`${year}`} {`${make.name}`}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>USD {`$${formatNumberWithCommas(fees.vehicle_price)}`}</Text>
          </div>
          <div style={{ display: 'flex', justifyContent:'space-between'}}>
            <Text style={{ fontSize: 14, color: 'gray' }}>{`${model.name} ${trim.name}`}</Text>
          </div>
          <div style={{ fontSize: 14, color: 'gray', marginTop: 5 }}>
            <DashboardOutlined style={{ marginRight: '2px' }}/> {`${mileage.toLocaleString()} KM`}
          </div>
        </div>
      }
    >
      <Meta 
        description={
          <div className='inventory-vehicle-meta'>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, margin: '5px 0px' }}>
              <div style={{ display: 'flex'}}> 
                <Avatar style={{ backgroundColor: getRandomColor(), verticalAlign: 'middle', cursor: 'pointer' }} size="small"> { getRandomLetter() } </Avatar> 
                {calculateDaysDifference(created_on) <= 0 ? <span style={{ margin: '0px 0px 0px 5px'}}> listed now </span> : <span style={{ margin: '0px 0px 0px 5px'}}> listed {calculateDaysDifference(created_on)} days ago </span> }
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, margin: '5px 0px' }}>
              {vin_number ? (<span style={{ fontSize: 14 }} onClick={(e) => handleCopyToClipboard(e, vin_number)}> 
                {`VIN: ${vin_number}`}
              </span>) : null}
            </div>
          </div>
        } 
      />
    </Card>
  );
}

export default VehicleCard;