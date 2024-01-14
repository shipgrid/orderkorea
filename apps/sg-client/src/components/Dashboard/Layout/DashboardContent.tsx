import { 
  ReactNode 
} from 'react';

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContent = ({
  children
}:DashboardContentProps) => {
  return (
    <div style={{ display: 'flex',  backgroundColor: '#f4f4f4' }}>
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardContent
