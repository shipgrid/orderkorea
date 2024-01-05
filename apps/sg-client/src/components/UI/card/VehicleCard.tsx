import { 
  List, 
  Typography, 
  Tag, 
  message,
  Image,
} from 'antd'

import '../../../assets/vehicle_card.css'

import { 
  DashboardOutlined, 
  CopyOutlined 
} from '@ant-design/icons'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

const { Text } = Typography

interface VehicleCardProps {
  vehicle: {
    vehicle_id: number
    make: string
    model: string
    year: string
    price: string
    mileage: string 
    exterior_color: string 
    interior_color: string 
    transmission_type: string 
    doors: number 
    trim: string 
    drivetrain: string 
    vin_number: string | null 
    is_new: boolean
    fuel_type: string 
    description: string 
    images: {
      image_url: string
    }[]
  },
  onClick: Function,
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  const { vehicle_id, make, model, year, vin_number, mileage, price, description, images } = vehicle
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

  return (
    <List.Item
      key={vehicle_id}
      className="card-container"
      onClick={handleItemClick}
    >
      <div className="vehicle-card">
        <div className="vehicle-image">
          <img
            src={mainImageUrl}
            alt={`${make} ${model}`}
          />
        </div>
        <div className="vehicle-info">

          <div className="vehicle-title-container">
            <Text className="vehicle-title" strong>{`${year} ${make} ${model}`}</Text>
          </div>

          <div className="vehicle-details">
            <Tag color="blue" style={{ marginRight: '8px' }}>
              <DashboardOutlined style={{ marginRight: '2px' }}/> {`${mileage.toLocaleString()} KM`}
            </Tag>
            {vin_number && (
              <Tag color="red" style={{ cursor: 'pointer' }} onClick={(e) => {
                e.stopPropagation() 
                copyToClipboard(vin_number)
              }}>
                {`VIN: ${vin_number}`}
                <CopyOutlined 
                  style={{ marginLeft: '8px' }} 
                />
              </Tag>
            )}    
          </div>

          <div className="vehicle-description">
            <Text>{description}</Text>
          </div>

        </div>
        <div className="vehicle-price-container">
          <Text className="vehicle-price">{`$${formatNumberWithCommas(price)}`}</Text>
        </div>
      </div>
      <div className="additional-images-container">
        {images.slice(1).map((image, index) => (
          <Image
            key={index}
            style={{ borderRadius: 5 }}
            width={135}
            src={image.image_url}
            preview={{
              src: 'https://via.placeholder.com/135x90?text=No+Image?',
            }}
            fallback={`https://via.placeholder.com/135x90?text=No+Image`}
            alt={`Additional view ${index + 1}`}
          />
        ))}
      </div>
    </List.Item>
  )
}

export default VehicleCard
