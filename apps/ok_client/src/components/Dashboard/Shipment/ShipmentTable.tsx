

import {
  Table
} from 'antd'

import '../../../assets/index.css'

const ShipmentTable = () => {

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Shipment',
      dataIndex: 'shipmentId',
      key: 'shipmentId',
    },
    {
      title: 'Service',
      dataIndex: 'carrierService',
      key: 'carrierService',
    },
    {
      title: 'Shipment Date',
      dataIndex: 'shipmentDate',
      key: 'shipmentDate',
    },
    {
      title: 'Tracking',
      dataIndex: 'trackingNumber',
      key: 'trackingNumber',
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalCost',
      key: 'totalCost',
    },
    {
      title: 'Dimensions',
      dataIndex: 'dimensions',
      key: 'dimensions',
    },
    {
      title: 'Weight',
      dataIndex: 'weight',
      key: 'weight',
    },
  ];

  const data = [
    {
      shipmentId: 10,
      carrierService: 'Korea Post - Express Mail Service',
      shipmentDate: new Date().toISOString(),
      trackingNumber: '1ZCYX29101283810',
      totalCost: 'USD 120.99',
      dimensions: '10cm x 10cm x 10cm',
      weight: '5.5kg',
    },
    {
      shipmentId: 11,
      carrierService: 'Korea Post - Express Mail Service',
      shipmentDate: new Date().toISOString(),
      trackingNumber: '1ZCYX29101283810',
      totalCost: 'USD 120.99',
      dimensions: '10cm x 10cm x 10cm',
      weight: '5.5kg',
    },
    {
      shipmentId: 12,
      carrierService: 'Korea Post - Express Mail Service',
      shipmentDate: new Date().toISOString(),
      trackingNumber: '1ZCYX29101283810',
      totalCost: 'USD 120.99',
      dimensions: '10cm x 10cm x 10cm',
      weight: '5.5kg',
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

export default ShipmentTable
