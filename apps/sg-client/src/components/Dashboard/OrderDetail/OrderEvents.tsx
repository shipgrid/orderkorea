import {
  Timeline,
  Collapse
} from 'antd'

import {
  OrderEvent
} from '../../../services/api'

import '../../../assets/index.css'

interface OrderDetailProps {
  orderEvents: OrderEvent[]; 
}

const OrderDetail: React.FC<OrderDetailProps> = ({ 
  orderEvents 
}) => {

  return (
    <>
      <div style={{ margin: 10 }}>
        <Collapse size='large' items={[
          {
            key: 1,
            label: 'Shipment History',
            children: <Timeline
            items={orderEvents.map((orderEvent) => {
              return {
                color: 'green',
                children: `${orderEvent.name} - ${orderEvent.created_on}`,
              }
            })}
          />
          }
        ]} defaultActiveKey={['1']}/>
      </div>
    </>
  );
}

export default OrderDetail
