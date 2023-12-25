import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import {
  Button
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import OrderDetail from '../OrderDetail/OrderDetail';
import ThirdPartyTable from '../OrderDetail/ThirdPartyTable';
import AddThirdPartyDropdownMenu from '../OrderDetail/AddThirdPartyDropdownMenu';
import AddDocumentModal from '../OrderDetail/AddDocumentModal';
import VehicleTable from '../OrderDetail/VehicleTable';
import DocumentTable from '../OrderDetail/DocumentTable';

import {
  useGetOrderQuery
} from '../../../services/api'

const OrderDetailContainer = () => {

  const searchParams = new URLSearchParams(location.search);

  const orderId = searchParams.get('order_id');

  if(!orderId) {
    return 'No order found'
  }

  const { data:order, error, isLoading } = useGetOrderQuery(orderId);

  if(!order) {
    return 'No order found'
  }

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Order Details'}
          description={'View your order details'}
        />
        <Divider my={3}/>
        <Button style={{marginBottom: 5, marginRight: 5 }}> Edit </Button>
        <Button style={{marginBottom: 5, marginRight: 5 }}> Set Status </Button>
        <Grid          
        title='Shipment Details'
          content={
            <OrderDetail
              order={order}
            />
          }
        />
        <Divider my={3}/>
        <AddThirdPartyDropdownMenu
          orderId={orderId}
        />
        <Grid
          title='Shipper, Consignee and Contacts'
          content={
            <ThirdPartyTable
              thirdParties={order.thirdParties}
            />
          }
        />
        <Divider my={3}/>
        <AddDocumentModal/>
        <Grid
          title='Documents'
          content={
            <DocumentTable
              documents={order.documents}
            />
          }
        />
      <Divider my={3}/>
        <Grid
          title='Vehicles'
          content={
            <VehicleTable
              vehicles={order.vehicles}
            />
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailContainer
