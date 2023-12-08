import {
  Table,
  Progress
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
      title: 'Order',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Order Status',
      dataIndex: 'orderStatus',
      key: 'orderStatus',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Expected',
      dataIndex: 'expected',
      key: 'expected',
    },
    {
      title: 'Inventory Status',
      dataIndex: 'inventoryStatus',
      key: 'inventoryStatus',
      render: (inventoryStatus: string) => (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <BsBoxes/> 
          <span style={{ marginLeft: 5 }}>  {inventoryStatus} </span>
        </div>
      )
    },
    {
      title: 'Inventory Received',
      dataIndex: 'receivedOrdered',
      key: 'receivedOrdered',
      render: (receivedOrdered: string) => (
        <div style={{ display: 'flex', alignItems: 'center'}}>
          <Progress percent={100} size="small" />
          <span style={{ marginLeft: 5 }}>  {receivedOrdered} </span>
        </div>
      )
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
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
