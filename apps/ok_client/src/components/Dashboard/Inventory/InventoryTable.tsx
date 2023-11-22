import {
  Table,
  Image
} from 'antd'


import Pagination from '../Pagination/Pagination';


const InventoryTable = () => {

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => <Image width={55} src={image} style={{ borderRadius: 2 }}/>
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Created',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
    },
  ];

  const data = [
    {
      image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww',
      vendor: 'Amazon',
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      createdOn: new Date().toISOString(),
      location: '34-010-A',
      quantity: 10,
      unitPrice: 'USD 39.99',
    },
    {
      image: 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/04/06/17/9/f7c15ab1-426a-419a-a8ab-ee572dc431aa.jpg',
      vendor: 'Amazon',
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      createdOn: new Date().toISOString(),
      location: '34-010-A',
      quantity: 10,
      unitPrice: 'USD 39.99',
    },
    {
      image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww',
      vendor: 'Amazon',
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      createdOn: new Date().toISOString(),
      location: '34-010-A',
      quantity: 10,
      unitPrice: 'USD 39.99',
    },
  ]

  return (
    <Table dataSource={data} columns={columns} />
  );
}

export default InventoryTable
