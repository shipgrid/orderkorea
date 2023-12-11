import {
  Table,
  Button
} from 'antd'

import '../../../assets/index.css'

import { 
  BsBoxes 
} from "react-icons/bs";

const OrderTable = () => {

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Make - Model',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Year',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Price',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Status',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Shipper',
      dataIndex: 'expected',
      key: 'expected',
    },
    {
      title: 'Consignee',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: 'Delivery Destination',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: 'Expected Arrival',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: 'Details',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (key: string) => {
        return (
          <Button key="setting" style={{ width: '90%', borderRadius: 20 }} type='primary'> View More </Button>
        )
      }
    },
  ];


  const data = [
    {
      id: 10,
      vendor: 'Coupang',
      orderStatus: 'Pending',
      created: new Date().toISOString(),
      expected: new Date().toISOString(),
      inventoryStatus: 'Over Received',
      receivedOrdered: '6/3',
      totalCost: 'USD 139.99',
    },
    {
      id: 11,
      vendor: 'Coupang',
      orderStatus: 'Complete',
      created: new Date().toISOString(),
      expected: new Date().toISOString(),
      inventoryStatus: 'Partially Received',
      receivedOrdered: '80/120',
      totalCost: 'USD 120.99',
    },
    {
      id: 12,
      vendor: 'Coupang',
      orderStatus: 'Pending',
      created: new Date().toISOString(),
      expected: new Date().toISOString(),
      inventoryStatus: 'Received',
      receivedOrdered: '60/60',
      totalCost: 'USD 59.99',
    },
  ];

  return (
    <Table 
      dataSource={data} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default OrderTable
