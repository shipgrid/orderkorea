import {
  Row,
  Col,
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import OrderTable from '../Order/OrderTable'  
import DashboardContent from '../Layout/DashboardContent';

const OrderContainer = ({}) => {

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
