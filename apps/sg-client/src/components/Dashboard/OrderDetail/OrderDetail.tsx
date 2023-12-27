import {
  Descriptions,
  Timeline,
  Divider,
  Collapse
} from 'antd'

import '../../../assets/index.css'

import {
  Order
} from '../../../services/api'

interface OrderDetailProps {
  order: Order; 
}

const OrderDetail: React.FC<OrderDetailProps> = ({ order }) => {

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

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
        <div style={{ margin: 10 }}>
          <Divider />
          <Collapse size='large' items={[
            {
              key: 1,
              label: 'Shipment History',
              children: <Timeline
              items={order.orderEvents.map((orderEvent) => {
                return {
                  color: 'green',
                  children: `${orderEvent.name} - ${orderEvent.created_on}`,
                }
              })}
            />
            }
          ]} defaultActiveKey={['1']} onChange={onChange} />
          
        </div>
      </div>
    </>
  );
}

export default OrderDetail
