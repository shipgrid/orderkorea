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
  FiTruck 
} from "react-icons/fi";

const { Header, Content, Sider } = Layout;

const items: MenuProps['items'] = [
  FiTruck,
  FiTruck,
  FiTruck,
  FiTruck,
  FiTruck,
  FiTruck,,
  FiTruck,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

interface LayoutProps {
  content: ReactNode; 
}

const DashboardLayout = ({
  content
}: LayoutProps) => {

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme='dark' mode="inline" defaultSelectedKeys={['4']} items={items} style={{ padding: 10}}/>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            // backgroundColor: 'white',
          }}
        >
          <div style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
            <div className="demo-logo" />
            <Avatar shape="square" size={40} style={{ backgroundColor: 'orange'}}> EK </Avatar>
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