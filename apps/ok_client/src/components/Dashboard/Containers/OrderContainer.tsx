import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import { 
  FiPlus 
} from "react-icons/fi";

import {
  Button,
  Dropdown,
  Menu
} from 'antd'

import type { 
  MenuProps 
} from 'antd';

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  
import DashboardContent from '../Layout/DashboardContent';

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Purchase Order
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Inform Order
      </a>
    ),
  },
]

const OrderContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Order Overview'}
          description={'View your orders and track your shipments'}
          action={
            <Dropdown
            overlay={<Menu items={dropdownItems} />}
            trigger={['click']}
            placement="bottomLeft"
            arrow
          >
            <Button icon={<FiPlus/>} style={{ marginRight: 10 }}> Create Order </Button>
          </Dropdown>
          }
        />
        <Divider my={5}/>
        <OrderTable />
      </DashboardContent>
    </Stack>
  );
}

export default OrderContainer
