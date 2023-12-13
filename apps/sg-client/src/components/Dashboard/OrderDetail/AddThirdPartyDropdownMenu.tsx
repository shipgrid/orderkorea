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

const AddThirdPartyDropdownMenu = ({ }) => {

  const navigate = useNavigate();

  const orderDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/delivery-destination'))}>
          <FiPlus/>
          <span style={{ marginLeft: 5 }}>  Add Delivery Destination </span>
        </div>
      ),
    },
    // {
    //   key: '2',
    //   label: (
    //     <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/inform-order'))}>
    //       <FiPlus/>
    //       <span style={{ marginLeft: 5 }}>  Add Notify Party </span>
    //     </div>
    //   ),
    // },
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