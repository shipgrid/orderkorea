import { 
  useState
} from 'react'

import {
  Image,
  Drawer,
  Tabs,
  Descriptions,
  Button,
  Space
} from 'antd'

import type { 
  DescriptionsProps 
} from 'antd';

import type { 
  TabsProps 
} from 'antd';

import {
  Vehicle,
} from '../../../services/api'

import {
  fallBackImageUrl
} from '../../../data'


import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'


interface VehicleDetailProps {
  vehicle: Vehicle
}

interface VehicleImage {
  image_url: string
}

const containerStyle: React.CSSProperties = {
  position: 'relative',
  height: 200,
  padding: 48,
  overflow: 'hidden',
  // background: token.colorFillAlter,
  // border: `1px solid ${token.colorBorderSecondary}`,
  // borderRadius: token.borderRadiusLG,
};

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

  const mainImage = vehicle.images[0]?.image_url
  const secondaryImagesToShow = vehicle.images.slice(1, Math.min(vehicle.images.length, 6))
  const additionalImagesCount = vehicle.images.length > 4 ? vehicle.images.length - 4 : 0

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'VIN Number',
      children: vehicle.vin_number,
    },
    {
      key: '2',
      label: 'Doors',
      children: `${vehicle.doors.name} Doors`,
    },
    {
      key: '3',
      label: 'Automatic Renewal',
      children: 'YES',
    },
    {
      key: '4',
      label: 'Order time',
      children: '2018-04-24 18:00:00',
    },
    {
      key: '5',
      label: 'Usage Time',
      children: '2019-04-24 18:00:00',
      span: 2,
    },
    {
      key: '7',
      label: 'Negotiated Amount',
      children: '$80.00',
    },
    {
      key: '8',
      label: 'Discount',
      children: '$20.00',
    },
    {
      key: '9',
      label: 'Official Receipts',
      children: '$60.00',
    },

  ];

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Specs',
      children: <Descriptions bordered items={items} column={1} size={'small'}/>
    },
    {
      key: '2',
      label: 'Overview',
      children: 'Content of Tab Pane 2',
    },
    {
      key: '3',
      label: 'Disclosure',
      children: 'Content of Tab Pane 3',
    },
  ];

  return (
    <div className='vehicle-detail'>  
      <div className='vehicle-detail-box'>
        <div className='vehicle-detail-images'>
          <Image.PreviewGroup
            items={vehicle.images.map((img: VehicleImage) => ({ src: img.image_url }))}
            fallback={fallBackImageUrl}
          >
            <Image 
              fallback={fallBackImageUrl} 
              src={mainImage} 
              width={'100%'}
            />
            {vehicle.images.slice(1).map((img, index) => (
              <Image
                key={index}
                src={img.image_url}
                style={{ display: 'none' }} 
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
                      style={{ flex: 1 }}
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
                        cursor: 'pointer'
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
                    style={{ flex: 1 }}
                  />
                )}
              </div>
            ))}
            <Drawer
              placement="bottom"
              closable={true}
              onClose={onClose}
              open={open}
              height={'100%'}
            >
              <Space size="large" direction="vertical" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {vehicle.images.map((img, index) => (
                  <Image
                    key={index}
                    src={img.image_url}
                    preview={true}
                    width={'calc(min(470px, 100vw) - 2px)'}
                  />
                ))}
              </Space>
            </Drawer>
          </div>
        </div>
        <div className='vehicle-detail-box'>
          <div className='vehicle-detail-info'>
            <div style={{ fontSize: 22, padding: '0px 0px 8px'}}>{vehicle.year} {vehicle.make.name} {vehicle.model.name} {vehicle.trim.name} </div>
            <div style={{ fontSize: 22}}>${vehicle.price}</div>
            <Button type="primary" style={{ marginTop: 24, width: '100%', height: 40, borderRadius: 12 }}> Contact Seller </Button>
            <Tabs defaultActiveKey="1" items={tabItems} style={{ margin: '24px 0px'}}/>
          </div>
        </div>
      </div>    
    </div>
  )
}

export default VehicleDetail
