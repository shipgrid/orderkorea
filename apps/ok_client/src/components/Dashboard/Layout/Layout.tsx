import React, {
  ReactNode,
  startTransition
} from 'react';

import type { 
  MenuProps 
} from 'antd';

import { 
  Layout, 
  Menu,
  Image,
  Avatar,
  Button,
  Dropdown
} from 'antd';

import {
  FiMenu,
  FiChevronDown,
  FiPlus
} from 'react-icons/fi'

import { 
  IconContext 
} from "react-icons";


import { 
  FiTruck 
} from "react-icons/fi";

import { 
  useNavigate 
} from 'react-router-dom'

import logo from '../../../assets/images/color-logo-no-bg.png'

const { Header, Content } = Layout;

const dropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Purchase Order
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer">
        Inform Order
      </a>
    ),
  },
];

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
  {
    label: 'Shipping Calculator',
    icon: FiTruck,
    path: '/shipping-calculator',
  },
];

const items: MenuProps['items'] = navItems.map((item, index) => ({
  key: item.path,
  icon: item.icon,
  label: `${item.label}`,
}));

interface LayoutProps {
  content: ReactNode; 
}

const DashboardLayout = ({
  content
}: LayoutProps) => {

  const navigate = useNavigate();

  return (
    <Layout hasSider>
      <Layout className="site-layout">
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            backgroundColor: 'white',
            height: 100,
          }}
        >
          <div style={{width: 1280, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Image src={logo} preview={false} style={{ height: 50, paddingRight: 10 }}/>
            <Menu mode="horizontal" defaultSelectedKeys={['/orders']} items={items} onClick={(e) => startTransition(() => navigate(e.key))} style={{ flex: 1 }}/>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Dropdown
                overlay={<Menu items={dropdownItems} />}
                trigger={['click']}
                placement="bottomLeft"
                arrow
              >
                <Button icon={<FiPlus/>} style={{ marginRight: 10 }}> Create Order </Button>
              </Dropdown>
              <Button icon={<FiTruck/>} style={{ marginRight: 10 }} disabled> Resume Shipment </Button>
              <Avatar shape="square" size={40} style={{ backgroundColor: 'orange'}}> EK </Avatar>
            </div>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>  
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;