import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import ShipmentTable from '../Shipment/ShipmentTable';

const ShipmentContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardHeader
        title={'Shipment Overview'}
        description={'View your shipments and track your orders'}
      />
      <Divider/>
      <ShipmentTable/>
    </Stack>
  );
}

export default ShipmentContainer
