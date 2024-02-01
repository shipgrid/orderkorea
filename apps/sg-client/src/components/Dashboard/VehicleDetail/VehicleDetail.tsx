import { 
  useState,
} from 'react'

import {
  Vehicle,
} from '../../../services/api'

import ImageGallery from './ImageGallery';
import VehicleTabContent from './VehicleTabContent';
import VehicleDetailHeader from './VehicleDetailHeader';
import ImageDisplay from './ImageDisplay'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface VehicleDetailProps {
  vehicle: Vehicle
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle
}) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
        <div className='vehicle-detail'>   
          <div className='vehicle-detail-box'>
            <ImageDisplay
              vehicle={vehicle}
              showDrawer={showDrawer}
            />
            <div className='vehicle-detail-box'>
              <div className='vehicle-detail-info'>
                <VehicleDetailHeader
                  vehicle={vehicle}
                />
                <VehicleTabContent
                  vehicle={vehicle}
                />
              </div>
            </div>
          </div>  
        </div>
      </div>
      <ImageGallery
        images={vehicle.images}
        onClose={onClose}
        open={open}
      />
    </>
  )
}

export default VehicleDetail
