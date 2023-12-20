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
  useGetOrdersQuery
} from '../../../services/api';


interface Shipper {
  name: string;
  line1: string;
  countryCode: string;
  stateCode: string;
  city: string;
  postalCode: string;
}

interface Order {
  order_id: number;
  customer_id: number | null;
  port_of_loading: string | null;
  container_number: string | null;
  port_of_arrival: string | null;
  loaded_on: string | null;
  orderEvents: OrderEvent[];
  thirdParties: ThirdParty[];
  documents: Document[];
  vehicles: Vehicle[];
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

interface OrderEvent {
  order_event_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

interface Vehicle {
  vehicle_id: number;
  make: string;
  model: string;
  year: number;
  description: string;
  exterior_color: string;
  transmission_type: string;
  mileage: number;
  price: number;
  images: Image[];
}

interface Image {
  image_url: string;
}

interface ThirdParty {
  third_party_id: number;
  address: Address;
  order_id: number;
  type: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

interface Address {
  address_id: number;
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state_code: string;
  country_code: string;
  postal_code: string;
  email: string | null;
  phone: string | null;
  customer_id: number | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

interface Document {
  document_id: number;
  order_id: number;
  file_url: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

const OrderTable = () => {

  const navigate = useNavigate();

  const { data:orders, error, isLoading } = useGetOrdersQuery();

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    // {
    //   title: 'Make - Model',
    //   dataIndex: 'id',
    //   key: 'id',
    //   render: (key: string) => {
    //     return (
    //       <div style={{ display: 'flex', alignItems: 'center' }}>
    //         <BsBoxes style={{ marginRight: 10 }}/>
    //         <span> 2008 Hyundai Elentra </span>
    //       </div>
    //     )
    //   }
    // },
    // {
    //   title: 'Vehicles',
    //   dataIndex: 'vehicles',
    //   key: 'vehicles',
    // },
    {
      title: 'Shipment Type',
      dataIndex: 'shipment_type',
      key: 'shipment_type',
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
      render: (key: Shipper, record: Order) => {

        const shipper = record?.thirdParties?.find((thirdParty: ThirdParty) => thirdParty.type === 'shipper')
        const address = shipper?.address

        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> {address?.name} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {address?.line1} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {address?.city}, {address?.state_code} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {address?.postal_code} </p>
          </div>
        )
      }
    },
    {
      title: 'Consignee',
      dataIndex: 'consignee',
      key: 'consignee',
      render:(key: Shipper, record: Order) => {

        const consignee = record?.thirdParties?.find((thirdParty: ThirdParty) => thirdParty.type === 'consignee')
        const address = consignee?.address

        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> {address?.name} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {address?.line1} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {address?.city}, {address?.state_code} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {address?.postal_code} </p>
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
      render: (key: string, record: Order) => {
        return (
          <Button key="setting" style={{ width: '90%', borderRadius: 20 }} type='primary' onClick={() => startTransition(() => navigate(`/orders?order_id=${record.order_id}`))}> View More </Button>
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
