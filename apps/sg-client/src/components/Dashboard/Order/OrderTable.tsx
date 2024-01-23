import {
  Table,
  Button,
  Progress
} from 'antd'

import '../../../assets/index.css'

import {
  startTransition
} from 'react';

import { 
  useNavigate 
} from 'react-router-dom'

import {
  useGetOrdersQuery,
  Order,
  Shipper,
  ThirdParty,
} from '../../../services/api';

const OrderTable = () => {

  const navigate = useNavigate();

  const { 
    data:orders, 
    isLoading 
  } = useGetOrdersQuery({});

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
      title: 'Shipment Type',
      dataIndex: 'shipment_type',
      key: 'shipment_type',
    },
    {
      title: 'Status',
      dataIndex: 'id',
      key: 'id',
      render: (_: string, _record: Order) => {

        return (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Progress percent={70} steps={10} size='small'/>            
            <span> IN_TRANSIT </span>
          </div>
        )
      }
    },
    {
      title: 'Shipper',
      dataIndex: 'shipper',
      key: 'shipper',
      render: (_: Shipper, record: Order) => {

        const shipper = record?.thirdParties?.find((thirdParty: ThirdParty) => thirdParty.type === 'shipper') 
        const address = shipper?.address[0]

        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> 
              {address?.name} <br/>
              {address?.line1} <br/>
              {address?.city}, {address?.state_code} <br/>
              {address?.postal_code} 
            </p>            
          </div>
        )
      }
    },
    {
      title: 'Consignee',
      dataIndex: 'consignee',
      key: 'consignee',
      render:(_: Shipper, record: Order) => {

        const consignee = record?.thirdParties?.find((thirdParty: ThirdParty) => thirdParty.type === 'consignee')
        const address = consignee?.address[0]

        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> 
              {address?.name} <br/>
              {address?.line1} <br/>
              {address?.city}, {address?.state_code} <br/>
              {address?.postal_code} 
            </p>            
          </div>
        )
      }
    },
    {
      title: 'Expected Arrival',
      dataIndex: 'expected_arrival',
      key: 'expected_arrival',
      render:(expected_arrival: string) => expected_arrival ? expected_arrival : 'N/A'
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
      loading={isLoading} 
      columns={columns} 
      rowClassName={rowClassName}
    />
  );
}

export default OrderTable
