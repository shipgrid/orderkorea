import {
  startTransition,
} from 'react';

import { 
  Layout, 
  Menu,
  Image
} from 'antd';

import type { 
  MenuProps
} from 'antd';

import { 
  useNavigate,
  useLocation
} from 'react-router-dom';

import UserNavbarDropdownMenu from './UserNavbarDropdownMenu';
import Logo from '../../../assets/images/logo-no-bg.png';
import useMobile from '../../../hooks/useMobile';

const { 
  Header 
} = Layout;

const navItems = [
  {
    label: 'Home',
    width: 110,
    path: '/',
  },
  {
    label: 'Cars For Sale',
    width: 110,
    path: '/broker-inventory',
    key:'/broker-inventory'
  },
  {
    label: 'My Inventory',
    width: 110,
    path: '/inventory',
    key:'/inventory'
  },
  {
    label: 'My Orders',
    width: 110,
    path: '/orders',
  },
  {
    label: 'My Account',
    width: 110,
    path: '/account',
  },
];

const items: MenuProps['items'] = navItems.map((item) => ({
  key: item.path,
  label: `${item.label}`,
}));
const NavbarHeader = ({ }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    isMobile
  } = useMobile();
  
  return (
    <Header
      style={{
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: '0px 32px'
      }}
    >
      <div style={{width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Image src={Logo} preview={false} style={{ width: 150, cursor:'pointer' }} onClick={(_) => startTransition(() => navigate('/'))}/>
        <div>
          {!isMobile && (
            <Menu 
              mode="horizontal" 
              style={{ width: '540px', fontWeight: 'bold', fontSize: 14 }} 
              defaultSelectedKeys={['/']} 
              items={items} 
              selectedKeys={[location.pathname]}
              onClick={(e) => startTransition(() => navigate(e.key))}
            />
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserNavbarDropdownMenu/>
        </div>
      </div>
    </Header>
  );
};

export default NavbarHeader;