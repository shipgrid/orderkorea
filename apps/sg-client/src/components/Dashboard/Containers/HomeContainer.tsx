import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Card,
  Button,
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import InventorySpotlight from '../Home/InventorySpotlight';

const HomeContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
            title={'Home Overview'}
            description="Here’s the best match for you."
          />
        <Divider my={5}/>
        <Card title="Welcome to ShipGrid" style={{ margin: 5 }} extra={<Button type='primary' style={{ borderRadius: 20}}> Get Started </Button>}>
          <p>We are the #1 auto trading platform in Korea</p>
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
        <p style={{ fontWeight: 'bold', margin: 5, marginTop: 20, marginBottom: 20,  fontSize: 18 }}> Inventory Spotlight </p>
        <InventorySpotlight/>
      </DashboardContent>
    </Stack>
  );
}

export default HomeContainer
