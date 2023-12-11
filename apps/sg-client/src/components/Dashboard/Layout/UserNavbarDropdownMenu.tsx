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
  FiChevronDown,
} from 'react-icons/fi'

import { 
  RiShipLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";

import {
  connect,
} from 'react-redux'

import { 
  useNavigate 
} from 'react-router-dom'

import { 
  Dispatch 
} from 'redux';

interface LogoutAction {
  type: string;
}

interface UserNavbarDropdownMenuProps {
  logout: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch<LogoutAction>) => ({
  logout: () => dispatch({ type: 'LOGOUT'}),
});

const UserNavbarDropdownMenu = ({ 
  logout
}: UserNavbarDropdownMenuProps) => {

  const navigate = useNavigate();

  const userDropdownItems: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <RiLogoutBoxRLine/> 
          <span style={{ marginLeft: 5 }} onClick={(e) => {e.stopPropagation; logout();}}>  Sign Out </span>
        </div>
      ),
    },
  ];

  const menuProps = {
    items: userDropdownItems,
    // onClick: handleMenuClick,
  };

  return (
    <Dropdown
      menu={menuProps}
      trigger={['click']}
      placement="bottomLeft"
      arrow
    >
      <Button icon={<FiChevronDown/>} style={{ marginRight: 10 }}> Emma Kim </Button>
    </Dropdown>
  );
};

export default (connect(null, mapDispatchToProps)(UserNavbarDropdownMenu))
