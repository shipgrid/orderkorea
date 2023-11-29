import {
  ReactNode,
} from 'react';

import { 
  Layout, 
} from 'antd';

import NavbarHeader from './NavbarHeader';

const { 
  Content
} = Layout;

interface LayoutProps {
  content: ReactNode; 
}

const DashboardLayout = ({
  content
}: LayoutProps) => {

  return (
    <Layout>
      <Layout className="site-layout">
        <NavbarHeader/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>  
          {content}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;