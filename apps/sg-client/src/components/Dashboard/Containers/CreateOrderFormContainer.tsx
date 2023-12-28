import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Switch,
} from 'antd';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import OrderForm from '../Forms/OrderForm';

const OrderDetailFormContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Create Order'}
          description={'Create a customer order'}
        />
        <Divider my={5}/>
        <Grid
          title={`Order Details`}
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          centerContent={true}
          content={
            <div style={{ display: 'flex', width: 800 }}>
              <OrderForm
              
              />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailFormContainer
