import {
  Table,
  Button,
} from 'antd'

import '../../../assets/index.css'

import {
  startTransition
} from 'react';

import { 
  useNavigate 
} from 'react-router-dom'

import {
  Order,
  // Shipper,
  // ThirdParty,
} from '../../../services/api';

interface OrderTableProps {
  orders: Order[]
}

const OrderTable = ({
  orders
}: OrderTableProps) => {

  const navigate = useNavigate();

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id',
    },
    {
      title: 'Buyer',
      dataIndex: 'buyer',
      key: 'buyer',
      render: (_: any, record: Order) => {

        const buyer = record?.buyer

        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> 
              {buyer?.first_name} {buyer?.last_name}<br/>
              {buyer?.username} <br/>
            </p>            
          </div>
        )
      }
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 'seller',
      render:(_: any, record: Order) => {

        const seller = record?.seller

        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> 
              {seller?.first_name} {seller?.last_name}<br/>
              {seller?.username} <br/>
            </p>            
          </div>
        )
      }
    },
    {
      title: 'Details',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (_: string, record: Order) => {
        return (
          <Button key="setting" style={{ width: '90%', borderRadius: 20 }} type='primary' onClick={() => startTransition(() => navigate(`/order?order_id=${record.order_id}`))}> View More </Button>
        )
      }
    },
  ];

  return (
    <Table 
      dataSource={orders}
      columns={columns} 
      rowClassName={rowClassName}
    />
  );
}

export default OrderTable
