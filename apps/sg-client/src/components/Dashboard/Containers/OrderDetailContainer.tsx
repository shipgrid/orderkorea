import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import {
  Switch,
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

const OrderDetailContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Order Details'}
          description={'View your order details'}
        />
        <Divider my={3}/>
        <Button style={{marginBottom: 5 }}> Edit </Button>
        <Grid          
        title='Shipment Details'
          content={
            <div>
              <OrderDetail/>
            </div>
          }
        />
        <Divider my={3}/>
        <AddThirdPartyDropdownMenu/>
        <Grid
          title='Shipper, Consignee and Contacts'
          content={
            <div>
              <ThirdPartyTable/>
            </div>
          }
        />
        <Divider my={3}/>
        <AddDocumentModal/>
        <Grid
          title='Documents'
          content={
            <div>
              <DocumentTable/>
            </div>
          }
        />
      <Divider my={3}/>
        <Grid
          title='Vehicles'
          content={
            <div>
              <VehicleTable/>
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailContainer
