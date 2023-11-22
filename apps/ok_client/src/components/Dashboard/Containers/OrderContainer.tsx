import {
  Stack,
  Divider,
  Button
} from '@chakra-ui/react';

import { 
  FiPlus 
} from "react-icons/fi";

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
          action={<Button colorScheme='blue' leftIcon={<FiPlus/>} size='sm'> Create Order </Button>}
        />
        <Divider/>
        <OrderTable />
      </DashboardContent>
    </Stack>
  );
}

export default OrderContainer
