import {
  Button,
  Dropdown, 
  Tag
} from 'antd'

import {
  Vehicle,
} from '../../../services/api'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

import {
  useSelector
} from 'react-redux'

import type { MenuProps } from 'antd';

import {
  useUpdateVehicleMutation
} from '../../../services/api'

import { 
  trackFormOpen
} from '../../../lib/analytics'

import config from '../../../config/config'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface VehicleDetailHeaderProps {
  vehicle: Vehicle;
  isOwner?: boolean;
}

const VehicleDetailHeader: React.FC<VehicleDetailHeaderProps> = ({
  vehicle,
  isOwner
}) => {
  const session = useSelector((state: any) => state.session);
  const [updateVehicle] = useUpdateVehicleMutation();

  const items: MenuProps['items'] = [
    vehicle.is_listed ? {
      key: 'delist',
      label: 'Delist Vehicle',
      onClick: () => updateVehicle({
        vehicle_id: vehicle.vehicle_id,
        is_listed: false
      })
    } : {
      key: 'list',
      label: 'List Vehicle',
      onClick: () => updateVehicle({
        vehicle_id: vehicle.vehicle_id,
        is_listed: true
      })
    },
    vehicle.is_sold ?  {
      key: 'for-sale',
      label: 'Mark For Sale',
      onClick: () => updateVehicle({
        vehicle_id: vehicle.vehicle_id,
        is_sold: false
      })
    } : {
      key: 'sold',
      label: 'Mark as Sold',
      onClick: () => updateVehicle({
        vehicle_id: vehicle.vehicle_id,
        is_listed: false,
        is_sold: true
      })
    }
  ];
  
  const onContactSellingBrokerClick = () => {
    trackFormOpen('Contact Selling Broker');
    window.location.href = config.forms.contactSellingBrokerLink({ 
      email: session.username,
      vehicle_id: vehicle.vehicle_id,
      make: vehicle.make.name,
      model: vehicle.model.name,
      trim: vehicle.trim.name,
      year: vehicle.year
    })
  };

  return (
    <div>
      <div className='vehicle-detail-title'>{vehicle.year} {vehicle.make.name} {vehicle.model.name} {vehicle.trim.name} </div>
      <div className='vehicle-detail-title'>${ formatNumberWithCommas(vehicle.fees.vehicle_price) }</div>
        {
          !vehicle.order_id && !isOwner ? (
            <Button type="primary" style={{ marginTop: 24, width: '100%', height: 40, borderRadius: 12 }}> 
              <a
                onClick={onContactSellingBrokerClick}
                rel="noopener noreferrer"
              >
                Contact Seller
              </a>
            </Button>
          ) : null
        }
        {
          isOwner ? (
            <>
              <Dropdown menu={{ items }} placement="bottomLeft">
                <Button  style={{ marginTop: 24, width: '100%', height: 40, borderRadius: 12 }}> 
                  Manage Listing
                </Button>            
              </Dropdown>
              <div>
                <Tag color={vehicle.is_listed ? 'orange' : 'red'} style={{ marginTop: 6, borderRadius: 12 }}>
                  {vehicle.is_listed ? 'Listed' : 'Not Listed'}
                </Tag>
                <Tag color={vehicle.is_sold ? 'green' : 'blue'} style={{ marginTop: 6, borderRadius: 12 }}>
                  {vehicle.is_sold ? 'Sold' : 'Not Sold'}
                </Tag>
              </div>
            </>
          ) : null
        }
    </div>
  )
}

export default VehicleDetailHeader
