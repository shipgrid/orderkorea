import {
  Stack,
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import OrderForm from '../Forms/OrderForm';

const OrderDetailFormContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Create Order'}
          description={'Create an order'}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 1200, backgroundColor: 'white', margin: '32px 0px', padding: '16px 16px' }}>
          <OrderForm/>
          </div>
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailFormContainer
