import { 
  Menu,
  Button,
  Dropdown
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import {
  FiChevronDown,
} from 'react-icons/fi'

import { 
  RiShipLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

const userDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <RiShipLine/> 
        <span style={{ marginLeft: 5 }}>  Shipping Calculator </span>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <RiLogoutBoxRLine/> 
        <span style={{ marginLeft: 5 }}>  Sign Out </span>
      </div>
    ),
  },
];

const UserNavbarDropdownMenu = ({ }) => {
  return (
    <Dropdown
      overlay={<Menu items={userDropdownItems} />}
      trigger={['click']}
      placement="bottomLeft"
      arrow
    >
      <Button icon={<FiChevronDown/>} style={{ marginRight: 10 }}> Emma Kim </Button>
    </Dropdown>
  );
};

export default UserNavbarDropdownMenu;