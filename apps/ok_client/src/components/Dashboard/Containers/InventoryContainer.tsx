import {
  Stack,
} from '@chakra-ui/react';

import InventoryCard from '../Inventory/InventoryCard'
import InventoryRow from '../Inventory/InventoryRow';

const Login = () => {
  return (
    <Stack minH={'100vh'}>
      <InventoryRow/>
      <InventoryRow/>
      <InventoryRow/>
      <InventoryRow/>
    </Stack>
  );
}

export default Login
