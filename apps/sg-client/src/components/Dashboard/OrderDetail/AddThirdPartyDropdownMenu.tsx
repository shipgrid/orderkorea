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
  useNavigate 
} from 'react-router-dom'

interface AddThirdPartyDropdownMenuProps {
  orderId: string; 
}

const AddThirdPartyDropdownMenu: React.FC<AddThirdPartyDropdownMenuProps> = ({ 
  orderId
}) => {

  const navigate = useNavigate();

  const orderDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate(`/delivery-destination?order_id=${orderId}`))}>
          <FiPlus/>
          <span style={{ marginLeft: 5 }}>  Add Delivery Destination </span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate(`/notify-party?order_id=${orderId}`))}>
          <FiPlus/>
          <span style={{ marginLeft: 5 }}>  Add Notify Party </span>
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
      <Button icon={<FiPlus/>} style={{ marginBottom: 5 }}> Add 3rd Party </Button>
    </Dropdown>
  );
};

export default AddThirdPartyDropdownMenu;