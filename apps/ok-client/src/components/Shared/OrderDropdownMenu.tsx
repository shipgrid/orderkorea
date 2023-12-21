import {
  startTransition
} from 'react';

import { 
  Menu,
  Button,
  Dropdown
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import {
  FiPlus,
} from 'react-icons/fi'

import { 
  RiInformationLine
} from "react-icons/ri";

import { 
  MdShoppingCartCheckout 
} from "react-icons/md";

import { 
  useNavigate 
} from 'react-router-dom'

const OrderDropdownMenu = ({ }) => {

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
    <Dropdown
      overlay={<Menu items={orderDropdownItems} />}
      trigger={['click']}
      placement="bottomLeft"
      arrow
    >
      <Button icon={<FiPlus/>} style={{ marginRight: 10 }}> Start A New Order! </Button>
    </Dropdown>
  );
};

export default OrderDropdownMenu;