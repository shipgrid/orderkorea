import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Card,
  Alert,
  Button,
  Image
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';

const { Meta } = Card;

const HomeContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
            title={'Home Overview'}
            description="Here’s the latest overview for your ."
          />
        <Divider my={5}/>
        {/* <Card title="Welcome to OrderKorea, start your first order now!" style={{ margin: 5}} extra={<Button type='primary'> Get Started </Button>}>
          <p>We guarauntee your first order. If you are not satisfied, we will give you a full refund</p>
        </Card>
        <div style={{ display: 'flex', marginTop: 10 }}>
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
        </div>
        <Alert
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
        <div style={{ display: 'flex', margin: 5 }}>
          <Card
            hoverable
            style={{ width: 220, flex: 1, margin: 5 }}
            cover={<Image height={260} alt="example" src="https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aHl1bmRhaXxlbnwwfHwwfHx8MA%3D%3D" />}
          >
            <Meta title="2008 Hyundai Elentra - USD 19,000" description="89,000 KM" />
          </Card>
          <Card
            hoverable
            style={{ width: 220, flex: 1, margin: 5 }}
            cover={<Image  height={260} alt="example" src="https://www.usnews.com/cmsmedia/56/44/fc92b01c4006b46932e72ac46fe8/2023-hyundai-tucson-hybrid-8.jpg" />}
          >
            <Meta title="2008 Hyundai Elentra - USD 19,000" description="89,000 KM" />
          </Card>
          <Card
            hoverable
            style={{ width: 220, flex: 1, margin: 5 }}
            cover={<Image height={260} alt="example" src="https://www.usnews.com/cmsmedia/56/44/fc92b01c4006b46932e72ac46fe8/2023-hyundai-tucson-hybrid-8.jpg" />}
          >
            <Meta title="2008 Hyundai Elentra - USD 19,000" description="89,000 KM" />
          </Card>
        </div>
        <p style={{ fontWeight: 'bold', margin: 5, marginTop: 20, marginBottom: 20,  fontSize: 18 }}> For you </p>
        <div style={{ display: 'flex', margin: 5 }}>
          <Card
            hoverable
            style={{ width: 220, flex: 1, margin: 5 }}
            cover={<Image height={260} alt="example" src="https://www.usnews.com/cmsmedia/56/44/fc92b01c4006b46932e72ac46fe8/2023-hyundai-tucson-hybrid-8.jpg" />}
          >
            <Meta title="2008 Hyundai Elentra - USD 19,000" description="89,000 KM" />
          </Card>
          <Card
            hoverable
            style={{ width: 220, flex: 1, margin: 5 }}
            cover={<Image  height={260} alt="example" src="https://www.usnews.com/cmsmedia/56/44/fc92b01c4006b46932e72ac46fe8/2023-hyundai-tucson-hybrid-8.jpg" />}
          >
            <Meta title="2008 Hyundai Elentra - USD 19,000" description="89,000 KM" />
          </Card>
          <Card
            hoverable
            style={{ width: 220, flex: 1, margin: 5 }}
            cover={<Image height={260} alt="example" src="https://www.usnews.com/cmsmedia/56/44/fc92b01c4006b46932e72ac46fe8/2023-hyundai-tucson-hybrid-8.jpg" />}
          >
            <Meta title="2008 Hyundai Elentra - USD 19,000" description="89,000 KM" />
          </Card>
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default HomeContainer
