import { useState, useEffect } from 'react'

import {
  Row,
  Col,
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  
import DashboardContent from '../Layout/DashboardContent';

const OrderContainer = ({}) => {

  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if(isMobile) {
    return <div> This page does not support mobile yet. Please use your desktop to browse this page.</div>
  }

  return (
    <Row>
      <Col style={{ flex: 1 }}>
        <DashboardContent>
          <DashboardHeader
            title={'Order'}
            description={'View your orders and track your shipments'}
          />
          <div style={{ margin: '64px 24px'}}> 
            <OrderTable />
          </div>
        </DashboardContent>
      </Col>
    </Row>
  );
}

export default OrderContainer
