import {
  Image,
  Descriptions,
  Button,
  Avatar,
  Row,
  Col,
  Card
} from 'antd'

import { 
  DashboardOutlined, 
  BranchesOutlined,
  CarOutlined,
} from '@ant-design/icons';

import {
  Vehicle,
  VehicleImage
} from '../../../services/api'

import '../../../assets/index.css'

import {
  formatNumberWithCommas
} from '../../../utils/format_string'

interface Image {
  image_url: string;
}

interface PhotoGalleryProps {
  images: VehicleImage[];
}

interface HighlightsProps {
  vehicle: Vehicle;
}

interface DescriptionProps {
  vehicle: Vehicle;
}

interface VehicleDetailProps {
  vehicle: Vehicle;
}

const cardStyle = {
  marginTop: 20,
  boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
  transition: '0.3s',
  borderRadius: '5px'
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ images }) => {
  const mainImage = images[0]?.image_url;
  const secondaryImagesToShow = images.slice(1, Math.min(images.length, 4));
  const additionalImagesCount = images.length > 4 ? images.length - 4 : 0;

  return (
    <Row gutter={16}>
      <Col span={18} style={{ display: 'flex', flexDirection: 'column' }}>
        <Image.PreviewGroup
          items={images.map((img: Image) => ({ src: img.image_url }))}
          fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
        >
          <Image 
            fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' 
            src={mainImage} 
            style={{ borderRadius: 25 }}
            width={'100%'}
          />
          {/* Hidden images for preview */}
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
              fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
              src={img.image_url}
              style={{ borderRadius: 10 }} 
              width={'100%'}
              height={'auto'}
            />
            {additionalImagesCount > 0 && index === secondaryImagesToShow.length - 1 && (
              <div style={{
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
              }} onClick={() => { 
                document.querySelector(`[src="${img.image_url}"]`).click();
              }}>
                +{additionalImagesCount}
              </div>
            )}
          </div>
        ))}
      </Col>
    </Row>
  );
};


const Highlights: React.FC<HighlightsProps> = ({ vehicle }) => {
  const { mileage, transmission_type, exterior_color } = vehicle;

  return (
    <Card 
      title="Highlights" 
      bordered={false} 
      headStyle={{ borderBottom: 0, opacity: 0.7, fontSize: 16 }}
      style={cardStyle} 
    >
      <Row gutter={16}>
        <Col key="mileage" span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <DashboardOutlined style={{ fontSize: '24px', opacity: 0.5 }} /> 
            <div style={{ fontSize: '16px' }}>{formatNumberWithCommas(mileage)} km</div>
          </div>
        </Col>
        <Col key="transmission" span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <BranchesOutlined style={{ fontSize: '24px', opacity: 0.5 }} /> 
            <div style={{ fontSize: '16px' }}>{transmission_type}</div>
          </div>
        </Col>
        <Col key="exterior" span={8}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CarOutlined style={{ fontSize: '24px', opacity: 0.5 }} /> 
            <div style={{ fontSize: '16px' }}>{exterior_color}</div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

const Specifications: React.FC<DescriptionProps> = ({ vehicle }) => {
  const { 
    mileage, 
    exterior_color,
    interior_color,
    transmission_type,
    doors, 
    trim, 
    drivetrain, 
    vin_number, 
    is_new,
    fuel_type, 
  } = vehicle;
  return (
    <Card 
      title="Specifications" 
      bordered={false} 
      headStyle={{ borderBottom: 0, opacity: 0.7, fontSize: 16 }}
      style={cardStyle} 
    >
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Mileage">{ formatNumberWithCommas(mileage) } km</Descriptions.Item>
        <Descriptions.Item label="Transmission Type"> { transmission_type } </Descriptions.Item>
        <Descriptions.Item label="Exterior Color"> { exterior_color } </Descriptions.Item>
        <Descriptions.Item label="Interior Color"> { interior_color } </Descriptions.Item>
        <Descriptions.Item label="Fuel Type"> { fuel_type } </Descriptions.Item>
        <Descriptions.Item label="Doors"> { doors } </Descriptions.Item>
        <Descriptions.Item label="Trim"> { trim } </Descriptions.Item>
        <Descriptions.Item label="Drive Train"> { drivetrain } </Descriptions.Item>
        <Descriptions.Item label="Status"> { is_new ? 'New' : 'Used' } </Descriptions.Item>
        <Descriptions.Item label="Vin Number"> { vin_number } </Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

const Description: React.FC<{description: string}> = ({ description }) => {
  return (
    <Card 
      title="Description" 
      bordered={false} 
      headStyle={{ borderBottom: 0, opacity: 0.7, fontSize: 16 }}
      style={cardStyle} 
    >
      <p style={{ fontSize: '16px'}}>  
        {description}
      </p>
    </Card>
  );
}

const PostedBy: React.FC<{ name: string, initials: string }> = ({ name, initials }) => {
  return (
    <div style={{ marginTop: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00', marginRight: 10 }}>
          {initials}
        </Avatar> 
        <p> Posted by {name} </p>
      </div>
    </div>
  );
}

const ActionButton: React.FC<{ text: string, onClick: Function }> = ({ text, onClick }) => {
  const handleClick = () => {
    onClick()
  }

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Button type="primary" onClick={handleClick} style={{ width: '100%', height: 50, borderRadius: 20 }}>
        {text}
      </Button>
    </div>
  );
}

const VehicleDetail: React.FC<VehicleDetailProps> = ({
  vehicle
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
      <PhotoGallery images={vehicle.images} />
      <PostedBy name={'Brian Lee'} initials={'BL'} />
      <Highlights vehicle={vehicle}/>
      <Description description={vehicle.description}/>
      <Specifications vehicle={vehicle}/>
      <ActionButton text="Buy" onClick={()=>{console.log('hit buy car')}} />
    </div>
  );
}

export default VehicleDetail
