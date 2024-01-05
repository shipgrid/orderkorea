import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Button,
  Space
} from 'antd';

import {
  useNavigate
} from 'react-router-dom'

import { 
  startTransition 
} from 'react';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';

const OrderDetailFormContainer = () => {

  const navigate = useNavigate();

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Admin Control Panel'}
          description={'Manage your inventory and orders.'}
        />
        <Divider my={5}/>
        <Grid
          title={`Upload Vehicle`}
          centerContent={true}
          content={
            <div>
              <Space style={{ display: 'flex', flexDirection: 'column'}}>
                <Button style={{ width: 200 }} onClick={() => startTransition(() => navigate('/upload-vehicle'))}> Upload Vehicle </Button>
                <Button style={{ width: 200 }} onClick={() => startTransition(() => navigate('/create-order'))}> Create Order </Button>
              </Space>
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailFormContainer
