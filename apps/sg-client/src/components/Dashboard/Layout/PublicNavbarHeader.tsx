import {
  startTransition,
} from 'react';

import { 
  Layout, 
  Button,
  Image
} from 'antd';

import type { 
  MenuProps
} from 'antd';

import { 
  useNavigate,
} from 'react-router-dom';

import Logo from '../../../assets/images/logo-no-bg.png';

const { 
  Header 
} = Layout;

const NavbarHeader = ({ }) => {
  const navigate = useNavigate();
  
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button type='primary' onClick={(_) => startTransition(() => navigate('/login'))}> Login </Button>
        </div>
      </div>
    </Header>
  );
};

export default NavbarHeader;