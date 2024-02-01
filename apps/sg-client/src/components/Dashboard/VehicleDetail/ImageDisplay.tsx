import {
  Image,
} from 'antd'

import {
  Vehicle,
} from '../../../services/api'

import {
  fallBackImageUrl
} from '../../../data'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface ImageDisplayProps {
  vehicle: Vehicle,
  showDrawer: () => void
}

interface VehicleImage {
  image_url: string
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({
  vehicle,
  showDrawer
}) => {

  const mainImage = vehicle.images[0]?.image_url
  const secondaryImagesToShow = vehicle.images.slice(1, Math.min(vehicle.images.length, 6))
  const additionalImagesCount = vehicle.images.length > 4 ? vehicle.images.length - 4 : 0
  
  return (
    <div className='vehicle-detail-images'>
      <Image.PreviewGroup
        items={vehicle.images.map((img: VehicleImage) => ({ src: img.image_url }))}
        fallback={fallBackImageUrl}
      >
        <Image 
          fallback={fallBackImageUrl} 
          src={mainImage} 
          width={'100%'}
          style={{ borderRadius: 10, border: '1px solid #E5E5E5'}}
        />
        {vehicle.images.slice(1).map((img, index) => (
          <Image
            key={index}
            src={img.image_url}
            style={{ display: 'none', }} 
          />
        ))}
      </Image.PreviewGroup>
      <div style={{ display: 'grid', gridAutoFlow: 'column', columnGap: 16, width: '100%', marginTop: 10 }}>
        {secondaryImagesToShow.map((img, index) => (
          <div key={index}>
            {index === secondaryImagesToShow.length - 1 ? ( 
              <div style={{ position: 'relative' }}>
                <Image
                  fallback={fallBackImageUrl}
                  src={img.image_url}
                  style={{ flex: 1, borderRadius: 10 }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    display: 'flex',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    cursor: 'pointer',
                    borderRadius: 10,
                    
                  }}
                  onClick={() => showDrawer()}
                >
                  <div style={{ color: 'white', fontSize: 14, fontWeight: 600, padding: '0px 8px' }}>{`+${additionalImagesCount}`}</div>
                </div>
              </div>
            ) : (
              <Image
                fallback={fallBackImageUrl}
                src={img.image_url}
                style={{ flex: 1, borderRadius: 10, border: '1px solid #E5E5E5' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageDisplay
