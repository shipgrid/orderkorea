import React, {
  ReactNode
} from 'react';

import type { 
  MenuProps 
} from 'antd';

import { 
  Layout, 
  Menu,
  Flex,
  Avatar
} from 'antd';

import {
  FiMenu,
  FiChevronDown,
} from 'react-icons/fi'

import { 
  IconContext 
} from "react-icons";

import { 
  FiTruck 
} from "react-icons/fi";

const { Header, Content } = Layout;

const navItems = [
  {
    label: 'Dashboard',
    icon: FiTruck,
    path: '/dashboard',
  },
  {
    label: 'Orders',
    icon: FiTruck,
    path: '/dashboard/orders',
  },
  {
    label: 'Products',
    icon: FiTruck,
    path: '/dashboard/products',
  },
  {
    label: 'Customers',
    icon: FiTruck,
    path: '/dashboard/customers',
  },
  {
    label: 'Reports',
    icon: FiTruck,
    path: '/dashboard/reports',
  },
  {
    label: 'Integrations',
    icon: FiTruck,
    path: '/dashboard/integrations',
  },
];

const items: MenuProps['items'] = navItems.map((item, index) => ({
  key: String(index + 1),
  icon: item.icon,
  label: `${item.label}`,
}));

interface LayoutProps {
  content: ReactNode; 
}

const DashboardLayout = ({
  content
}: LayoutProps) => {

  return (
    <Layout hasSider>
      <Layout className="site-layout">
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Menu theme='dark' mode="horizontal" defaultSelectedKeys={['4']} items={items}/>
            <div className="demo-logo" />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ marginRight: 20 }}>
                <IconContext.Provider value={{ color: "white", size: '2.0em' }}>
                  <FiTruck />
                </IconContext.Provider>
              </div>
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