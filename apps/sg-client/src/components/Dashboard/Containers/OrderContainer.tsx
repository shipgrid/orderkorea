import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  
import DashboardContent from '../Layout/DashboardContent';

const OrderContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Order Overview'}
          description={'View your orders and track your shipments'}
        />
        <Divider my={5}/>
        <OrderTable />
      </DashboardContent>
    </Stack>
  );
}

export default OrderContainer
