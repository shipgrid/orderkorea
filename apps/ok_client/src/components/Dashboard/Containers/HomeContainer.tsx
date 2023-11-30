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
            description="Here’s the latest overview for your store."
          />
        <Divider my={5}/>
        <Card title="Welcome to OrderKorea, start your first order now!" style={{ margin: 5}}>
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
          message="Informational Notes"
          description="Additional description and information about copywriting."
          type="info"
          showIcon
          style={{ margin: 5 }}
          action={
            <Button size="small" type="primary">
              Get Started
            </Button>
          }
        />
        <p style={{ fontWeight: 'bold', margin: 5, marginTop: 20, marginBottom: 20,  fontSize: 18 }}> For you </p>
        <div style={{ display: 'flex', margin: 5 }}>
          <Card
            hoverable
            style={{ width: 300, flex: 1, margin: 5 }}
            cover={<Image height={220} alt="example" src="https://images.ctfassets.net/b7g9mrbfayuu/5q3XYdfBrG6KmsaAgKqISo/3ec31a7339bad5d2a5781882298a85ce/Falling_stars.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, flex: 1, margin: 5 }}
            cover={<Image  height={220} alt="example" src="https://images.ctfassets.net/b7g9mrbfayuu/5EhOhJp7mommMymA0s80cQ/c843398e722a8f60dd866b7396e934bc/Screenshot_2022-11-17_at_09.48.13.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
          <Card
            hoverable
            style={{ width: 300, flex: 1, margin: 5 }}
            cover={<Image height={220} alt="example" src="https://images.ctfassets.net/b7g9mrbfayuu/4USt5LNMmQA88sggyOEg0w/b95cbd9fc699b63d76eeebbddd98ddd4/Untitled_Artwork_50.png" />}
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default HomeContainer
