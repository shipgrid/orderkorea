import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import InventoryTable from '../Inventory/InventoryTable';

const InventoryContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardHeader
        title={'Inventory Overview'}
        description={'Update your inventory and ship them out when you are ready'}
      />
      <Divider/>
      <InventoryTable />
    </Stack>
  );
}

export default InventoryContainer
