import {
  startTransition,
} from 'react';

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
  FaWpforms 
} from "react-icons/fa";

import { 
  IoCarSportSharp 
} from "react-icons/io5";

import {
  useDispatch,
} from 'react-redux'

import { 
  useNavigate 
} from 'react-router-dom'

import { 
  useFirebase 
} from 'react-redux-firebase'

import { 
  useSelector 
} from 'react-redux'

const UserNavbarDropdownMenu = ({ 
}) => {

  const navigate = useNavigate();
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const session = useSelector((state: any) => state.session);

  const userDropdownItems: MenuProps['items'] = [];
  
  if(session?.isStaff) {
    userDropdownItems.push(
      {
        key: '1',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <IoCarSportSharp/> 
            <span style={{ marginLeft: 5 }} onClick={(e) => startTransition(() => navigate('upload-vehicle'))}>  Upload Vehicle </span>
          </div>
        ),
      })

    userDropdownItems.push(
      {
        key: '2',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}}>
            <FaWpforms/> 
            <span style={{ marginLeft: 5 }} onClick={(e) => startTransition(() => navigate('create-order'))}>  Create Order </span>
          </div>
        ),
      }
    )
  }

  userDropdownItems.push(
    {
      key: '3',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={(e) => {e.stopPropagation; firebase.logout(); dispatch({ type: 'LOGOUT' });}}>
          <RiLogoutBoxRLine/> 
          <span style={{ marginLeft: 5 }}>  Sign Out </span>
        </div>
      ),
    },
  )

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
      <Button icon={<FiChevronDown/>} style={{ marginRight: 10 }}> { session?.username } </Button>
    </Dropdown>
  );
};

export default UserNavbarDropdownMenu
