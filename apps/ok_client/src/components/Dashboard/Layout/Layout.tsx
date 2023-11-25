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
  RiShipLine,
  RiLogoutBoxRLine,
  RiInformationLine
} from "react-icons/ri";

import { 
  FiTruck 
} from "react-icons/fi";

import { 
  MdShoppingCartCheckout 
} from "react-icons/md";


import { 
  useNavigate 
} from 'react-router-dom'

import logo from '../../../assets/images/color-logo-no-bg.png'

const { Header, Content } = Layout;


const userDropdownItems: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <RiShipLine/> 
        <span style={{ marginLeft: 5 }}>  Shipping Calculator </span>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <RiLogoutBoxRLine/> 
        <span style={{ marginLeft: 5 }}>  Sign Out </span>
      </div>
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


  const orderDropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}} onClick={() => startTransition(() => navigate('/purchase-order'))}>
          <MdShoppingCartCheckout/>
          <span style={{ marginLeft: 5 }}>  Purchase Order </span>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <RiInformationLine/>
          <span style={{ marginLeft: 5 }}>  Inform Order </span>
        </div>
      ),
    },
  ];

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
                overlay={<Menu items={orderDropdownItems} />}
                trigger={['click']}
                placement="bottomLeft"
                arrow
              >
                <Button icon={<FiPlus/>} style={{ marginRight: 10 }}> Create Order </Button>
              </Dropdown>
              <Dropdown
                overlay={<Menu items={userDropdownItems} />}
                trigger={['click']}
                placement="bottomLeft"
                arrow
              >
                <Button icon={<FiChevronDown/>} style={{ marginRight: 10 }}> Emma Kim </Button>
              </Dropdown>
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