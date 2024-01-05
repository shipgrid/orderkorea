import {
  Image,
  Row,
  Col
} from 'antd'

import {
  VehicleImage
} from '../../../services/api'

import '../../../assets/index.css'

import {
  fallBackImageUrl
} from '../../../data'

interface Image {
  image_url: string
}

interface PhotoGalleryProps {
  images: VehicleImage[]
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ 
  images
}) => {
  const mainImage = images[0]?.image_url
  const secondaryImagesToShow = images.slice(1, Math.min(images.length, 4))
  const additionalImagesCount = images.length > 4 ? images.length - 4 : 0

  const handleClickImage = (img: Image) => {

    if(!document.querySelector(`[src="${img.image_url}"]`)) {
      return
    }

    const target = document.querySelector(`[src="${img.image_url}"]`) as HTMLImageElement;
    target.click()
  }

  return (
    <Row gutter={16}>
      <Col span={18} style={{ display: 'flex', flexDirection: 'column' }}>
        <Image.PreviewGroup
          items={images.map((img: Image) => ({ src: img.image_url }))}
          fallback={fallBackImageUrl}
        >
          <Image 
            fallback={fallBackImageUrl} 
            src={mainImage} 
            style={{ borderRadius: 25 }}
            width={'100%'}
          />
          {images.slice(1).map((img, index) => (
            <Image
              key={index}
              src={img.image_url}
              style={{ display: 'none' }} 
            />
          ))}
        </Image.PreviewGroup>
      </Col>
      <Col span={6}>
        {secondaryImagesToShow.map((img, index) => (
          <div key={index} style={{ position: 'relative', marginBottom: 8 }}>
            <Image
              fallback={fallBackImageUrl}
              src={img.image_url}
              style={{ borderRadius: 10 }} 
              width={'100%'}
              height={'auto'}
            />
            {additionalImagesCount > 0 && index === secondaryImagesToShow.length - 1 && (
              <div 
                style={{
                  position: 'absolute',
                  background: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  width: '100%',
                  height: '98%',
                  borderRadius: 10,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '36px',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  cursor: 'pointer', 
                }} 
                onClick={() => handleClickImage(img)}
              >
                +{additionalImagesCount}
              </div>
            )}
          </div>
        ))}
      </Col>
    </Row>
  )
}

export default PhotoGallery