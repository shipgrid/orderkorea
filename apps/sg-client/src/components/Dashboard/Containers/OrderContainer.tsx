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
import useMobile from '../../../hooks/useMobile';

const OrderContainer = ({}) => {

  const {
    isMobile
  } = useMobile()

  const { 
    data:orders, 
    isLoading 
  } = useGetOrdersQuery({});


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
