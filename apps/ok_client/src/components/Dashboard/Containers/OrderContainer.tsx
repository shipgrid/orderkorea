import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import {
  startTransition
} from 'react';

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

import { 
  MdShoppingCartCheckout 
} from "react-icons/md";

import { 
  RiInformationLine
} from "react-icons/ri";

import { 
  useNavigate 
} from 'react-router-dom'

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  
import DashboardContent from '../Layout/DashboardContent';

const OrderContainer = () => {

  const navigate = useNavigate();

  const orderDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/purchase-order'))}>
          <MdShoppingCartCheckout/>
          <span style={{ marginLeft: 5 }}>  Purchase Order </span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/inform-order'))}>
          <RiInformationLine/>
          <span style={{ marginLeft: 5 }}>  Inform Order </span>
        </div>
      ),
    },
  ];

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Order Overview'}
          description={'View your orders and track your shipments'}
          action={
            <Dropdown
            overlay={<Menu items={orderDropdownItems} />}
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
