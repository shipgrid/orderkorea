import { 
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
  RiLogoutBoxRLine,
} from "react-icons/ri";

import {
  useDispatch,
} from 'react-redux'

import { useFirebase } from 'react-redux-firebase'

const UserNavbarDropdownMenu = ({ 
}) => {

  const firebase = useFirebase();
  const dispatch = useDispatch();

  const userDropdownItems: MenuProps['items'] = [
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <RiLogoutBoxRLine/> 
          <span style={{ marginLeft: 5 }} onClick={(e) => {e.stopPropagation; firebase.logout(); dispatch({ type: 'LOGOUT' });}}>  Sign Out </span>
        </div>
      ),
    },
  ];

  const menuProps = {
    items: userDropdownItems,
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

export default UserNavbarDropdownMenu
