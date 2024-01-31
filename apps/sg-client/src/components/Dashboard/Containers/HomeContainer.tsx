import { 
  useState,
  useEffect
} from 'react';

import {
  Stack,
} from '@chakra-ui/react';

import {
  Button,
  Space,
  Card,
  Image,
  Drawer
} from 'antd';

import {
  useNavigate,
} from 'react-router-dom'

import { 
  startTransition 
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  trackPageView,
  trackFormOpen
} from '../../../lib/analytics'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import PricePana from '../../../assets/images/price-pana.png';
import PaymentSuccess from '../../../assets/images/payment-success.png';
import CarAmico from '../../../assets/images/car-amico.png';
import CarPana from '../../../assets/images/car-pana.png';

import '../../../assets/home.css'

const HomeContainer = () => {

  const navigate = useNavigate();
  const session = useSelector((state: any) => state.session);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  }

  const onListCarClick = () => {
    trackFormOpen('List a Car');
    window.location.href = `https://docs.google.com/forms/d/e/1FAIpQLSc2Ehqh5mG3FzBjZMyDqNZjmWUAxee5TAvxCdqqDfhWC2_hrg/viewform?usp=pp_url&entry.362768116=${session.username}`
  };
  
  useEffect(() => {
    trackPageView('Home')
  }, [])

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Home'}
        />
        <div className='home-container'>
        <Space style={{ display: 'flex', padding: 5, justifyContent: 'center' }} wrap>
          <div className='learn-more'>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Welcome to Shipgrid</div>
              <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12, flexWrap: 'wrap' }}>The premier workstation for car brokers around the world.</div>
              <div>
                <Button type='primary' onClick={showDrawer}> Learn More </Button>
              </div>
            </div>
          </div>
        </Space>
          <Space style={{ display: 'flex', padding: 5, justifyContent: 'center' }} wrap>
            <Card onClick={() => startTransition(() => navigate('/broker-inventory'))} hoverable title="Buy Cars" bordered={false} style={{ width: 340, height: '100%', cursor: 'pointer' }} cover={<Image preview={false} src={PricePana} alt='buy-car-home' style={{ width: 300 }} />}>
              <div style={{ height: 85}}>
                Buy cars from our network of brokers and traders. 
              </div>
              <Button type='primary' style={{ width: '100%' }}> Buy Cars </Button>
            </Card>
 
            <Card hoverable title="Sell Cars" bordered={false} style={{ width: 340, height: '100%', cursor: 'pointer' }} cover={<Image preview={false}  src={PaymentSuccess} alt='payment-success' style={{ width: 300 }} />}>
              <div style={{ height: 85}}>
                Upload cars and sell to other brokers and traders.
              </div>
                <Button type='primary'  style={{ width: '100%' }} onClick={onListCarClick}> Sell Cars </Button>
            </Card>

            <Card onClick={() => startTransition(() => navigate('/inventory'))} hoverable title="My Inventory" bordered={false} style={{ width: 340, height: '100%', cursor: 'pointer' }} cover={<Image preview={false}  src={CarAmico} alt='buy-car-home' style={{ width: 300 }} />}>
              <div style={{ height: 85}}>
                Manage your inventory of cars that you have for sale.
              </div>
              <Button type='primary'  style={{ width: '100%' }}> My Inventory </Button>
            </Card>
            <Card onClick={() => startTransition(() => navigate('/orders'))} hoverable title="My Orders" bordered={false} style={{ width: 340, height: '100%', cursor: 'pointer' }} cover={<Image preview={false}  src={CarPana} alt='buy-car-home' style={{ width: 300 }} />}>
              <div style={{ height: 85}}>
                Manage and view your ongoing or completed orders that you have with other brokers.
              </div>
              <Button type='primary'  style={{ width: '100%' }}> My Orders </Button>
            </Card>
          </Space>
        </div>
      </DashboardContent>
        <Drawer
          title="Welcome to Shipgrid"
          placement={'bottom'}
          closable={true}
          onClose={onClose}
          open={open}
          key={'bottom'}
          height={'75%'}
          extra={[
            <Button onClick={onClose} type='primary'> Close </Button>
          ]}
        >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Space direction='vertical' className='learn-more-content' wrap>
            <h1 style={{ marginBottom: 12 }}>Welcome to Shipgrid</h1>
            <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>
              The premier workstation for car brokers around the world. By being a part of Shipgrid, you can buy, sell, and organize your inventory and access the global market, connecting with brokers and dealerships all over the world.
            </div>
            <div style={{ margin: '12px 0px'}}>
              <h2> Eligibility </h2>
              <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>
                Shipgrid is an enclosed platform accessible for auto traders who have been vetted for their quality, reliability, and trustworthiness. 
                We review each application to ensure that our platform is safe, secure, and compliant for all users.
                <br/>
                <br/>
                Brokers who abuse the platform will be removed from Shipgrid and the Broker Network.
              </div>
            </div>
            <div style={{ margin: '12px 0px'}}>
              <h2> Code of Conduct </h2>
              <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>
                Inventory must be accurately described and priced. We do not tolerate false advertising or misleading information. 
                <br/>
                <br/>
                All listed inventory must be verified by 3 interior photos, 3 exterior photos, VIN number, mileage, make, model, year, and location of the vehicle. 
                <br/>
                <br/>
                If the listed inventory has been sold or no longer available, please remove the listing immediately. If not, the listing will be removed automatically after 7 days. 
                <br/>
                <br/>
                Any illegitimate documents (pro-forma invoices, commercial invoices, packing list, LC docs, BL, etc.) that are uploaded will be removed and are considered a violation of Shipgrid's Code of Conduct.
              </div>
            </div>
          </Space>
        </div>
        </Drawer>
    </Stack>
  );
}

export default HomeContainer
