import {
  Table,
  Progress,
  Card,
  Image
} from 'antd'

import '../../../assets/index.css'

import { 
  BsBoxes 
} from "react-icons/bs";

const VehicleImages = () => {

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
    <div style={{ display: 'flex', justifyContent: 'center'}}>
      <Image
        style={{ borderRadius: 25}}
        width={'100%'}
        src="https://ci.encar.com/carpicture/carpicture03/pic3593/35931075_001.jpg?impolicy=heightRate&rh=480&cw=640&ch=480&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_03.png&t=20230912193136"
      />
    </div>
  );
}

export default VehicleImages
