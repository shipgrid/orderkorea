import {
  startTransition
} from 'react';

import { 
  Layout, 
  Menu,
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import {
  FiHome
} from 'react-icons/fi'

import { 
  FaWpforms 
} from "react-icons/fa";

import { 
  useNavigate 
} from 'react-router-dom'

import UserNavbarDropdownMenu from './UserNavbarDropdownMenu';
import { IoCarSportSharp } from "react-icons/io5";

const { 
  Header 
} = Layout;

const navItems = [
  {
    label: 'Home',
    icon: <FiHome/>,
    path: '/',
  },
  {
    label: 'Inventory',
    icon: <IoCarSportSharp/>,
    path: '/inventory',
  },
  {
    label: 'Orders',
    icon: <FaWpforms/>,
    path: '/orders',
  }
];

const items: MenuProps['items'] = navItems.map((item, index) => ({
  key: item.path,
  icon: item.icon,
  label: `${item.label}`,
}));

const NavbarHeader = ({ }) => {

  const navigate = useNavigate();

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        height: 100,
        backgroundColor: '#013A20',
      }}
    >
      <div style={{width: 1280, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <p style={{ color: '#CDD193', fontSize: '32px', fontWeight: 'bolder', paddingRight: 10 }}> ShipGrid</p>
        <Menu 
          theme='dark' 
          mode="horizontal" 
          style={{ flex: 1 }} 
          defaultSelectedKeys={['/']} 
          items={items} 
          onClick={(e) => startTransition(() => navigate(e.key))}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserNavbarDropdownMenu/>
        </div>
      </div>
    </Header>
  );
};

export default NavbarHeader;