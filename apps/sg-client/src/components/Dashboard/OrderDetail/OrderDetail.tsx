import {
  Descriptions,
  Divider,
} from 'antd'

import {
  Order
} from '../../../services/api'

import OrderEvent from './OrderEvents'
import config from '../../../config/config'

import '../../../assets/index.css'

interface OrderDetailProps {
  order: Order; 
}

const OrderDetail: React.FC<OrderDetailProps> = ({ 
  order 
}) => {

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div style={{ marginTop: 10 }}>
          <Descriptions column={2} bordered layout='vertical' size="small">
            <Descriptions.Item label="SHIPMENT TYPE">{ order.shipment_type } </Descriptions.Item>
            <Descriptions.Item label="CITY_OF_LOADING">{ order.port_of_loading }</Descriptions.Item>
            <Descriptions.Item label="Container Number"> { order.container_number }</Descriptions.Item>
            <Descriptions.Item label="PORT OF ARRIVAL">{ order.port_of_arrival }</Descriptions.Item>
            <Descriptions.Item label="CREATED">{ order.created_on }</Descriptions.Item>
            <Descriptions.Item label="LOADED ON">{ order.loaded_on } </Descriptions.Item>
            <Descriptions.Item label="LAST EDITED">{ order.updated_on } </Descriptions.Item>
            <Descriptions.Item label="ESTIMATED DATE OF ARRIVAL">{ order.expected_arrival } </Descriptions.Item>
          </Descriptions>
        </div>
        <Divider />
        {
          config.featureFlags.showOrderEvents && (
            <OrderEvent 
              orderEvents={order.orderEvents} 
            />
          )
        }

      </div>
    </>
  );
}

export default OrderDetail
