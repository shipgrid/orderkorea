import {
  Button,
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

import config from '../../../config'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface VehicleDetailProps {
  vehicle: Vehicle
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle
}) => {
  const session = useSelector((state: any) => state.session);
  
  return (
    <div>
      <div className='vehicle-detail-title'>{vehicle.year} {vehicle.make.name} {vehicle.model.name} {vehicle.trim.name} </div>
      <div className='vehicle-detail-title'>${ formatNumberWithCommas(vehicle.fees.vehicle_price) }</div>
      <a
        href={config.forms.contactSellingBrokerLink({ 
          email: session.username,
          vehicle_id: vehicle.vehicle_id,
          make: vehicle.make.name,
          model: vehicle.model.name,
          trim: vehicle.trim.name,
          year: vehicle.year
        })}
        rel="noopener noreferrer"
      >
        {
          !vehicle.order_id ? (
            <Button type="primary" style={{ marginTop: 24, width: '100%', height: 40, borderRadius: 12 }}> 
              Contact Selling Broker 
            </Button>
          ) : null
        }
      </a>
    </div>
  )
}

export default VehicleDetail
