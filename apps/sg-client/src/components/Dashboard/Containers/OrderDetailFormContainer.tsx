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
import OrderDetailForm from '../Forms/OrderDetailForm';

import {
  useGetOrderQuery
} from '../../../services/api'

const OrderDetailFormContainer = () => {

  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('order_id');

  if(!orderId) {
    return 'No order found'
  }

  const { data:order, error, isLoading } = useGetOrderQuery(orderId);

  if(!order) {
    return 'No order found'
  }
  console.log(order)
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Order Details'}
          description={'Update your order details'}
        />
        <Divider my={5}/>
        <Grid
          title={`Order Details: ${orderId}`}
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          centerContent={true}
          content={
            <div style={{ display: 'flex', width: 800 }}>
              <OrderDetailForm 
                order={order}
              />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailFormContainer
