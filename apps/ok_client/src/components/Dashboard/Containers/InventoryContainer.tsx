import {
  Stack,
  Divider
} from '@chakra-ui/react';

import { 
  FiPlus 
} from "react-icons/fi";

import {
  Button
} from 'antd'

import {
  useNavigate
} from 'react-router-dom'

import {
  startTransition
} from 'react'

import DashboardHeader from '../Layout/DashboardHeader';
import InventoryTable from '../Inventory/InventoryTable';
import DashboardContent from '../Layout/DashboardContent';

const InventoryContainer = () => {

  const navigate = useNavigate()
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Inventory Overview'}
          description={'Update your inventory and ship them out when you are ready'}
          action={<Button icon={<FiPlus />} onClick={() => startTransition(() => navigate('/create-shipment'))}> Start New Shipment </Button>}
        />
        <Divider my={5}/>
        <InventoryTable />
      </DashboardContent>
    </Stack>
  );
}

export default InventoryContainer
