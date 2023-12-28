import {
  startTransition
} from 'react';

import {
  Card,
  Button,
  Image,
  Skeleton,
  Empty
} from 'antd'

import { 
  useNavigate 
} from 'react-router-dom'

import { 
  useGetVehiclesQuery
} from '../../../services/api';

import SomethingWentWrong from '../../Shared/SomethingWentWrong';

const { Meta } = Card;

const InventorySpotlight = () => {

  const navigate = useNavigate();

  const { 
    data:vehicles, 
    error, 
    isLoading 
  } = useGetVehiclesQuery({});

  if(error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
       <SomethingWentWrong/>
      </div>
    )
  }

  if(isLoading) {
    return (
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
        <Skeleton.Image style={{ width: 310, height: 260, flex: '0 0 calc(33% - 10px)'}} active/>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
      {
        vehicles && vehicles.map((vehicle: any, i: number) => {
          return (
            <Card
              key={i}
              hoverable
              style={{ width: 220, flex: '1 0 calc(33% - 10px)'}}
              cover={
                <Image.PreviewGroup
                  items={
                    vehicle.images.map((image: any) => {
                      return { src: image.image_url }
                    })
                  }
                  fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                >
                  <Image  fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' height={260} src={vehicle.images[0]?.image_url} style={{ borderRadius: 8 }}/>
                </Image.PreviewGroup>
              }                  
              actions={[
                <Button key="setting" style={{ width: '90%', borderRadius: 20 }} type='primary'  onClick={() => startTransition(() => navigate(`/vehicle?vehicle_id=${vehicle.vehicle_id}`))}> Details </Button>,
              ]}
            >
              <Meta title={`${vehicle.year} ${vehicle.make} ${vehicle.model} - USD ${vehicle.price}`} description={`${vehicle.mileage} KM`} />
            </Card>
          )
        })
      }
    </div>
  );
}

export default InventorySpotlight
