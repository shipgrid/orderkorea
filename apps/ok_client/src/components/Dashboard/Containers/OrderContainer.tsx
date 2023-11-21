import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  

const OrderContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardHeader
        title={'Order Overview'}
        description={'View your orders and track your shipments'}
      />
      <Divider/>
      <OrderTable />
    </Stack>
  );
}

export default OrderContainer
