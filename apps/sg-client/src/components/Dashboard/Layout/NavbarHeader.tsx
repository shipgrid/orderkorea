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

import Logo from '../../../assets/images/logo-no-bg.png';

import UserNavbarDropdownMenu from './UserNavbarDropdownMenu';

const { 
  Header 
} = Layout;

const navItems = [
  {
    label: 'Inventory',
    width: 110,
    path: '/',
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
        {/* <p style={{ marginTop: 0, fontSize: '28px', fontWeight: 'bolder', cursor: 'pointer' }} onClick={(_) => startTransition(() => navigate('/'))}> ShipGrid</p> */}
        <Image src={Logo} preview={false} style={{ width: 150 }}/>
        <div>
          {!isMobile && (
            <Menu 
              mode="horizontal" 
              style={{ width: 200 }} 
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