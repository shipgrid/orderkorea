import { 
  useState,
} from 'react'

import {
  Image,
  Drawer,
  Tabs,
  Button,
  Space,
  Divider,
} from 'antd'

import type { 
  TabsProps 
} from 'antd';

import {
  Vehicle,
} from '../../../services/api'

import {
  fallBackImageUrl
} from '../../../data'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

import '../../../assets/index.css'
import '../../../assets/vehicle_detail.css'

interface VehicleDetailProps {
  vehicle: Vehicle
}

interface VehicleImage {
  image_url: string
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

  const mainImage = vehicle.images[0]?.image_url
  const secondaryImagesToShow = vehicle.images.slice(1, Math.min(vehicle.images.length, 6))
  const additionalImagesCount = vehicle.images.length > 4 ? vehicle.images.length - 4 : 0
  
  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'Specs',
      children: <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> VIN </div>
            <div> { vehicle.vin_number } </div>
          </div>
          <Divider style={{ margin: '10px 0px 10px' }}/>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '5px 0px 0px', justifyContent: 'space-between' }}>
            <div> Exterior </div>
            <div> { vehicle.exterior_color.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Interior </div>
            <div> { vehicle.interior_color.name } </div>
          </div>
          <Divider style={{ margin: '10px 0px 10px' }}/>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Mileage </div>
            <div> { formatNumberWithCommas(vehicle.mileage) } km</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Year </div>
            <div> { vehicle.year } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '5px 0px 0px', justifyContent: 'space-between' }}>
            <div> Make </div>
            <div> { vehicle.make.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Model </div>
            <div> { vehicle.model.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Trim </div>
            <div> { vehicle.trim.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Body Style </div>
            <div> { vehicle.body_style.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Doors </div>
            <div> { vehicle.doors.name } </div>
          </div>
          <Divider style={{ margin: '10px 0px 10px' }}/>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Transmission </div>
            <div> { vehicle.transmission.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Cylinders </div>
            <div> { vehicle.cylinders.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Drivetrain </div>
            <div> { vehicle.drivetrain.name } </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
            <div> Fuel Type </div>
            <div> { vehicle.fuel_type.name } </div>
          </div>
        </div>
      </div>
    },
    // {
    //   key: '2',
    //   label: 'Pricing (USD)',
    //   children: <div style={{ flex: 1 }}>
    //     <div style={{ display: 'flex', flexDirection: 'column' }}>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Vehicle Price </div>
    //         <div> ${ formatNumberWithCommas(vehicle.fees.vehicle_price) } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Service Fee </div>
    //         <div> ${ vehicle.fees.service_fee } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Delivery Fee </div>
    //         <div> { vehicle.fees.delivery_fee ? `$${vehicle.fees.delivery_fee}` : `TBD` } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div style={{ fontWeight: 'bold' }}> Subtotal </div>
    //         <div> TBD + Delivery </div>
    //       </div>
    //       <Divider style={{ margin: '20px 0px 20px' }}> Due Now </Divider>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Deposit </div>
    //         <div> ${ formatNumberWithCommas(vehicle.fees.deposit_fee) } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div> Service Fee </div>
    //         <div> ${ formatNumberWithCommas(vehicle.fees.service_fee) } </div>
    //       </div>
    //       <div style={{ display: 'flex', flexDirection: 'row', margin: '0px 0px 0px', justifyContent: 'space-between' }}>
    //         <div style={{ fontWeight: 'bold' }}> Total Due </div>
    //         <div> ${ formatNumberWithCommas((vehicle.fees.deposit_fee) + vehicle.fees.service_fee*1) } </div>
    //       </div>
    //     </div>
    //   </div>
    // },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white'}}>
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
                  style={{ borderRadius: 10}}
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
                            borderRadius: 10
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
                        style={{ flex: 1, borderRadius: 10 }}
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
                <div className='vehicle-detail-title'>{vehicle.year} {vehicle.make.name} {vehicle.model.name} {vehicle.trim.name} </div>
                <div style={{ fontSize: 22}}>${ formatNumberWithCommas(vehicle.fees.vehicle_price) }</div>
                <a
                  href="https://forms.gle/HPtbqMS1t3WNJWps8"
                  target="_blank"
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
                <Tabs defaultActiveKey="1" items={tabItems} style={{ margin: '24px 0px'}}/>
              </div>
            </div>
          </div>  
        </div>
      </div>
    </>
  )
}

export default VehicleDetail
