import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import InventoryTable from '../Inventory/InventoryTable';
import DashboardContent from '../Layout/DashboardContent';

const InventoryContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Inventory Overview'}
          description={'Update your inventory and ship them out when you are ready'}
        />
        <Divider/>
        <InventoryTable />
      </DashboardContent>
    </Stack>
  );
}

export default InventoryContainer
