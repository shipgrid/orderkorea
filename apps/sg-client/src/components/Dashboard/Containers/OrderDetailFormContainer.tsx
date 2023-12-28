import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Switch,
} from 'antd';

import {
  useGetOrderQuery,
  useUpdateOrderMutation
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import OrderDetailForm from '../Forms/OrderDetailForm';
import ApiLoader from '../../Shared/ApiLoader';
import ResourceNotFound from '../../Shared/ResourceNotFound';

const OrderDetailFormContainer = () => {

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');

  if(!orderId) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  const { 
    data:order, 
    error, 
    isLoading 
  } = useGetOrderQuery(orderId);

  const [
    updateOrder, { 
      isLoading: updateOrderLoading 
    }
  ] = useUpdateOrderMutation();

  const handleUpdateOrder = async (values: any) => {
    await updateOrder({
      order_id: parseInt(orderId),
      ...values
    })
  }

  if(isLoading) {
    return <ApiLoader />
  }

  if(!order || error) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

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
                updateOrder={handleUpdateOrder}
                isLoading={updateOrderLoading}
              />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailFormContainer
