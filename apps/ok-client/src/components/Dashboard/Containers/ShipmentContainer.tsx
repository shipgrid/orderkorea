import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import ShipmentTable from '../Shipment/ShipmentTable';
import DashboardContent from '../Layout/DashboardContent';

const ShipmentContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Shipment Overview'}
          description={'View your shipments and track your orders'}
        />
        <Divider my={5}/>
        <ShipmentTable/>
      </DashboardContent>
    </Stack>
  );
}

export default ShipmentContainer
