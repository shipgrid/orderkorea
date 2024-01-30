import { 
  useState, 
  useEffect 
} from 'react'

import {
  Row,
  Col,
} from 'antd'

import {
  useGetOrdersQuery,
} from '../../../services/api';

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  
import DashboardContent from '../Layout/DashboardContent';
import ApiLoader from '../../Shared/ApiLoader';


const OrderContainer = ({}) => {

  const [isMobile, setIsMobile] = useState(false);

  const { 
    data:orders, 
    isLoading 
  } = useGetOrdersQuery({});

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 900);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(isLoading || !orders) {
    return (
      <ApiLoader />
    )
  }

  if(isMobile) {
    return <div style={{ margin: '64px 24px'}}> This page does not support mobile yet. Please use your desktop to browse this page.</div>
  }

  return (
    <Row>
      <Col style={{ flex: 1 }}>
        <DashboardContent>
          <DashboardHeader
            title={'My Orders'}
          />
          <div style={{ margin: '64px 24px'}}> 
            <OrderTable 
              orders={orders}
            />
          </div>
        </DashboardContent>
      </Col>
    </Row>
  );
}

export default OrderContainer
