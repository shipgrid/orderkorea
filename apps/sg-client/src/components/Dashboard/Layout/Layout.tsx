import {
  ReactNode,
} from 'react';

import {
  useSelector
} from 'react-redux';

import NavbarHeader from './NavbarHeader';
import PublicNavbarHeader from './PublicNavbarHeader';

interface LayoutProps {
  content: ReactNode; 
}

const DashboardLayout = ({
  content
}: LayoutProps) => {

  const session = useSelector((state: any) => state.session);

  return (
    <div>
      { session.isAuth ? <NavbarHeader/> : <PublicNavbarHeader/> }
      {content}
    </div>
  );
};

export default DashboardLayout;