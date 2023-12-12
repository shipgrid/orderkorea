import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  startTransition,
  useEffect,
  useState
} from 'react';

import {
  Card,
  Button,
  Image,
  Col,
  Row
} from 'antd'

import { 
  useNavigate 
} from 'react-router-dom'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';

import agent from '../../../api/agent';

const { Meta } = Card;

interface Vehicle {
  vehicle_id: number;
  make: string;
  model: string;
  year: number;
  mileage: number;
  price: number;
  images: Image[];
}

interface Image {
  image_url: string;
}

interface ResponseBody {
  data: Vehicle[];
  success: boolean;
}

const HomeContainer = () => {

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const getVehicles = async () => {
    const response = await agent.vehicles.list();
    const {
      data, 
      success
    } = response.data as ResponseBody; // Access 'data' directly from 'response'
    setVehicles(data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getVehicles();
  }, []);

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
            title={'Home Overview'}
            description="Here’s the latest overview for your ."
          />
        <Divider my={5}/>
        <Card title="Welcome to ShipGrid, start your first order now!" style={{ margin: 5 }} extra={<Button type='primary' style={{ borderRadius: 20}}> Get Started </Button>}>
          <p>We guarauntee your first order. If you are not satisfied, we will give you a full refund</p>
        </Card>
        {/* <div style={{ display: 'flex', marginTop: 10 }}>
          <Card title="Your Total Orders" style={{ flex: 1, margin: 5}}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
          <Card title="Your Total Shipments" style={{ flex: 1, margin: 5}}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div> */}
        {/* <Alert
          message="Refer a friend and get $10 off your next order!"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
          style={{ margin: 5 }}
          action={
            <Button size="small" type="primary">
              Get Started
            </Button>
          }
        /> */}
        <p style={{ fontWeight: 'bold', margin: 5, marginTop: 20, marginBottom: 20,  fontSize: 18 }}> Inventory </p>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {
            vehicles.map((vehicle) => {
              return (
                <Card
                  hoverable
                  style={{ width: 220, flex: '0 0 calc(25% - 10px)'}}
                  cover={
                    <Image.PreviewGroup
                      items={
                        vehicle.images.map((image) => {
                          return { src: image.image_url }
                        })
                      }
                      fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
                    >
                      <Image  fallback='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' height={260} src={vehicle.images[0]?.image_url} style={{ borderRadius: 8 }}/>
                    </Image.PreviewGroup>
                  }                  
                  actions={[
                    <Button key="setting" style={{ width: '90%', borderRadius: 20 }} type='primary'  onClick={() => startTransition(() => navigate(`/vehicle?vehicle_id=${vehicle.vehicle_id}`))}> View More </Button>,
                  ]}
                >
                  <Meta title={`${vehicle.year} ${vehicle.make} ${vehicle.model} - USD 19,000`} description="89,000 KM" />
                </Card>
              )
            })
          }
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default HomeContainer
