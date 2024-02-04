import {
  startTransition,
} from 'react';

import { 
  Dropdown,
  Avatar
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import { 
  RiLogoutBoxRLine,
} from "react-icons/ri";

import { 
  MdOutlineAdminPanelSettings 
} from "react-icons/md";

import {
  useDispatch,
  useSelector
} from 'react-redux'

import { 
  useNavigate 
} from 'react-router-dom'

import { LiaCarSideSolid } from "react-icons/lia";

import { CiSettings } from "react-icons/ci";

import { 
  CiViewList 
} from "react-icons/ci";

import { 
  PiGarage 
} from "react-icons/pi";

import { 
  IoHomeOutline 
} from "react-icons/io5";

import useMobile from '../../../hooks/useMobile';

const UserNavbarDropdownMenu = ({ 
}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const session = useSelector((state: any) => state.session);

  const {
    isMobile
  } = useMobile();

  const userDropdownItems: MenuProps['items'] = [];

  if(isMobile) {
    userDropdownItems.push(
      {
        key: 'home',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/'))}>
            <IoHomeOutline/>
            <span style={{ marginLeft: 5 }}>  Home </span>
          </div>
        ),
      })

    userDropdownItems.push(
      {
        key: 'broker-inventory',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/broker-inventory'))}>
            <LiaCarSideSolid/> 
            <span style={{ marginLeft: 5 }}>  Cars For Sale </span>
          </div>
        ),
      })

    userDropdownItems.push(
      {
        key: 'my-inventory',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/inventory'))}>
            <PiGarage/> 
            <span style={{ marginLeft: 5 }}>  My Inventory </span>
          </div>
        ),
      })

    userDropdownItems.push(
      {
        key: 'my-orders',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/orders'))}>
            <CiViewList/> 
            <span style={{ marginLeft: 5 }}>  My Orders </span>
          </div>
        ),
      })

    userDropdownItems.push(
      {
        key: 'my-account',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/account'))}>
            <CiSettings/> 
            <span style={{ marginLeft: 5 }}>  My Account </span>
          </div>
        ),
      })
  }

  if(session?.isStaff) {
    userDropdownItems.push(
      {
        key: 'admin',
        label: (
          <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('admin'))}>
            <MdOutlineAdminPanelSettings/> 
            <span style={{ marginLeft: 5 }}>  Admin </span>
          </div>
        ),
      })
  }

  userDropdownItems.push(
    {
      key: 'sign-out',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={(e) => {
          e.stopPropagation; 
          dispatch({ type: 'LOGOUT' });
          }}
        >
          <RiLogoutBoxRLine/> 
          <span style={{ marginLeft: 5 }}>  Sign Out </span>
        </div>
      ),
    }
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
      <div>
      <Avatar style={{ backgroundColor: 'green', verticalAlign: 'middle', cursor: 'pointer' }} size="large">
        {session.username[0] + session.username[1] }
      </Avatar>        
      </div>
    </Dropdown>
  );
};

export default UserNavbarDropdownMenu
