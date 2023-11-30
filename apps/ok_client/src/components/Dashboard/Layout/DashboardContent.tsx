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
    <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#FCFBF3'  }}>
      <div style={{ flex: 1, maxWidth: 1280 }}>
        {children}
      </div>
    </div>
  );
}

export default DashboardContent
