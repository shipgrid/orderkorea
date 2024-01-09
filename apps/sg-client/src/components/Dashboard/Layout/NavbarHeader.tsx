import {
  startTransition
} from 'react';

import { 
  Layout, 
  Menu,
  Space
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import { 
  FaWpforms 
} from "react-icons/fa";

import { 
  useNavigate 
} from 'react-router-dom'

import { 
  IoCarSportSharp 
} from "react-icons/io5";

import UserNavbarDropdownMenu from './UserNavbarDropdownMenu';

const { 
  Header 
} = Layout;

const navItems = [
  {
    label: 'Shop Cars',
    icon: <IoCarSportSharp/>,
    path: '/',
  },
  // {
  //   label: 'Orders',
  //   icon: <FaWpforms/>,
  //   path: '/orders',
  // }
];

const items: MenuProps['items'] = navItems.map((item) => ({
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
        backgroundColor: '#0e1111',
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
          <Space size={10}>
            <UserNavbarDropdownMenu/>
          </Space>
        </div>
      </div>
    </Header>
  );
};

export default NavbarHeader;