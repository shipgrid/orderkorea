import {
  Table,
  Button,
  Progress
} from 'antd'

import '../../../assets/index.css'

import { 
  BsBoxes 
} from "react-icons/bs";

import {
  startTransition
} from 'react';

import { 
  useNavigate 
} from 'react-router-dom'

interface Shipper {
  name: string;
  line1: string;
  countryCode: string;
  stateCode: string;
  city: string;
  postalCode: string;
}


const OrderTable = () => {

  const navigate = useNavigate();

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Make - Model',
      dataIndex: 'id',
      key: 'id',
      render: (key: string) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <BsBoxes style={{ marginRight: 10 }}/>
            <span> 2008 Hyundai Elentra </span>
          </div>
        )
      }
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Status',
      dataIndex: 'id',
      key: 'id',
      render: (key: string) => {
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
      render: (key: Shipper) => {
        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> {key?.name} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.line1} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.city}, {key?.stateCode} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.postalCode} </p>
          </div>
        )
      }
    },
    {
      title: 'Consignee',
      dataIndex: 'consignee',
      key: 'consignee',
      render:(key: Shipper) => {
        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> {key?.name} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.line1} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.city}, {key?.stateCode} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.postalCode} </p>
          </div>
        )
      }
    },
    {
      title: 'Expected Arrival',
      dataIndex: 'expected_arrival',
      key: 'expected_arrival',
    },
    {
      title: 'Details',
      dataIndex: 'totalCost',
      key: 'totalCost',
      render: (key: string) => {
        return (
          <Button key="setting" style={{ width: '90%', borderRadius: 20 }} type='primary' onClick={() => startTransition(() => navigate('/order-detail'))}> View More </Button>
        )
      }
    },
  ];


  const data = [
    {
      id: 10,
      make: 'Mazda',
      model: 'Mazda 3',
      year: 2023,
      price: 'USD 19,000',
      status: 'In Transit',
      shipper: {
        name: 'Joe Fong (Richmond, BC)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      consignee: {
        name: 'Monica Wu (Toronto, ON)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      expected_arrival: new Date().toISOString(),
    },
    {
      id: 11,
      make: 'Mazda',
      model: 'Mazda 3',
      year: 2023,
      price: 'USD 19,000',
      status: 'In Transit',
      shipper: {
        name: 'Joe Fong (Richmond, BC)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      consignee: {
        name: 'Monica Wu (Toronto, ON)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      expected_arrival: new Date().toISOString(),
    },
    {
      id: 12,
      make: 'Mazda',
      model: 'Mazda 3',
      year: 2023,
      price: 'USD 19,000',
      status: 'In Transit',
      shipper: {
        name: 'Joe Fong (Richmond, BC)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      consignee: {
        name: 'Monica Wu (Toronto, ON)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      expected_arrival: new Date().toISOString(),
    },
  ];

  return (
    <Table 
      dataSource={data} 
      columns={columns} 
      rowClassName={rowClassName}
    />
  );
}

export default OrderTable
