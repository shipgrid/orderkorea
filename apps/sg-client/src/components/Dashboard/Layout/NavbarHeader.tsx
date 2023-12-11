import {
  startTransition
} from 'react';

import { 
  Layout, 
  Menu,
  Image,
} from 'antd';

import type { 
  MenuProps 
} from 'antd';

import {
  FiTruck,
  FiHome
} from 'react-icons/fi'

import { 
  BsBoxes 
} from "react-icons/bs";

import { 
  FaWpforms 
} from "react-icons/fa";

import { 
  RiShipLine,
} from "react-icons/ri";

import { 
  LiaFileInvoiceDollarSolid 
} from "react-icons/lia";

import { 
  useNavigate 
} from 'react-router-dom'

import OrderDropdownMenu from '../../Shared/OrderDropdownMenu';
import UserNavbarDropdownMenu from './UserNavbarDropdownMenu';

import logo from '../../../assets/images/white-logo-no-bg.png'

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
    label: 'Orders',
    icon: <FaWpforms/>,
    path: '/orders',
  },
  // {
  //   label: 'Inventory',
  //   icon: <BsBoxes/>,
  //   path: '/inventory',
  // },
  // {
  //   label: 'Shipments',
  //   icon: <RiShipLine/>,
  //   path: '/shipments',
  // },
  // {
  //   label: 'Billing',
  //   icon: <LiaFileInvoiceDollarSolid/>,
  //   path: '/billing',
  // },
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
        <p style={{ color: 'white', fontSize: '32px', fontWeight: 'bolder', paddingRight: 10 }}> ShipGrid</p>
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