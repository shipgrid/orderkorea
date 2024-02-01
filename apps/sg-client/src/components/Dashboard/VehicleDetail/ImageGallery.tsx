import {
  Image,
  Drawer,
  Space,
} from 'antd'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface VehicleImage {
  image_url: string
}

interface ImageGalleryProps {
  images: VehicleImage[],
  onClose: () => void
  open: boolean
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onClose,
  open
}) => {

  return (
    <>
      <Drawer
        placement="bottom"
        closable={true}
        onClose={onClose}
        open={open}
        height={'100%'}
      >
        <Space size="large" direction="vertical" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {images.map((img, index) => (
            <Image
              key={index}
              src={img.image_url}
              preview={true}
              width={'calc(min(470px, 100vw) - 2px)'}
            />
          ))}
        </Space>
      </Drawer>     
    </>
  )
}

export default ImageGallery
