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
  FiTruck 
} from 'react-icons/fi'

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
    label: 'Orders',
    icon: FiTruck,
    path: '/orders',
  },
  {
    label: 'Inventory',
    icon: FiTruck,
    path: '/inventory',
  },
  {
    label: 'Shipments',
    icon: FiTruck,
    path: '/shipments',
  },
  {
    label: 'Billing',
    icon: FiTruck,
    path: '/billing',
  },
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
        // height: 100,
        // backgroundColor: 'white',
      }}
    >
      <div style={{width: 1280, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Image src={logo} preview={false} style={{ height: 50, paddingRight: 10 }}/>
        <Menu 
          theme='dark' 
          mode="horizontal" 
          style={{ flex: 1 }} 
          defaultSelectedKeys={['/orders']} 
          items={items} 
          onClick={(e) => startTransition(() => navigate(e.key))}
        />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <OrderDropdownMenu/>
          <UserNavbarDropdownMenu/>
        </div>
      </div>
    </Header>
  );
};

export default NavbarHeader;