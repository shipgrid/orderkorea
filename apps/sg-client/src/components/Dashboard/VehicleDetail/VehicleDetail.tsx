import {
  Avatar
} from 'antd'

import {
  DescriptionCard,
  VehicleSpecificationsCard, 
  VehicleHighlightsCard
} from '../../UI/card'

import {
  PhotoGallery
} from '../../UI/photo'

import {
  Vehicle
} from '../../../services/api'

import '../../../assets/index.css'

import {
  MAIN_SELLER_NAME, 
  MAIN_SELLER_INITIALS
}  from '../../../data'

interface VehicleDetailProps {
  vehicle: Vehicle
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle
}) => {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <PhotoGallery images={vehicle.images} />
      <div style={{ marginTop: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
          <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00', marginRight: 10 }}>
            {MAIN_SELLER_INITIALS}
          </Avatar> 
          <p> Posted by {MAIN_SELLER_NAME} </p>
        </div>
      </div>
      <VehicleHighlightsCard vehicle={vehicle}/>
      <DescriptionCard description={vehicle.description}/>
      <VehicleSpecificationsCard vehicle={vehicle}/>
      {/* <div style={{ marginTop: 20, marginBottom: 20 }}>
        <Button type="primary" onClick={handleReserveVehicle} style={{ width: '100%', height: 50, borderRadius: 20 }}>
          Reserve This Vehicle
        </Button>
      </div> */}
    </div>
  )
}

export default VehicleDetail
