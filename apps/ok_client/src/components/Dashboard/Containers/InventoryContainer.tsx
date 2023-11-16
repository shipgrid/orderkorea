import {
  Stack,
} from '@chakra-ui/react';

import InventoryRow from '../Inventory/InventoryRow';

const InventoryContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <InventoryRow/>
      <InventoryRow/>
      <InventoryRow/>
      <InventoryRow/>
    </Stack>
  );
}

export default InventoryContainer
