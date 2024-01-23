import {
  ReactNode,
} from 'react';

import NavbarHeader from './NavbarHeader';

interface LayoutProps {
  content: ReactNode; 
}

const DashboardLayout = ({
  content
}: LayoutProps) => {

  return (
    <div>
      <NavbarHeader/>
      {content}
    </div>
  );
};

export default DashboardLayout;