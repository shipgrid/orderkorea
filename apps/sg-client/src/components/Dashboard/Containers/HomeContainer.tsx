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
} from 'antd';

import {
  trackPageView,
} from '../../../lib/analytics'

import AboutMoreDrawer from '../Home/AboutMoreDrawer'
import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import CardList from '../Home/CardList'
import '../../../assets/home.css'

const HomeContainer = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    trackPageView('/')
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
          <CardList/>
        </div>
      </DashboardContent>
      <AboutMoreDrawer 
        open={open}
        onClose={onClose}
        showDrawer={showDrawer}
        />
    </Stack>
  );
}

export default HomeContainer
