import {
  startTransition,
  useEffect,
  useState
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
  useNavigate 
} from 'react-router-dom';

import UserNavbarDropdownMenu from './UserNavbarDropdownMenu';
import Logo from '../../../assets/images/logo-no-bg.png';

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
    label: 'Broker Network',
    width: 110,
    path: '/broker-inventory',
  },
  {
    label: 'My Orders',
    width: 110,
    path: '/orders',
  },
];

const items: MenuProps['items'] = navItems.map((item) => ({
  key: item.path,
  label: `${item.label}`,
}));
const NavbarHeader = ({ }) => {

  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900); 
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
              style={{ width: '100%', fontWeight: 'bold', fontSize: 16 }} 
              defaultSelectedKeys={['/']} 
              items={items} 
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