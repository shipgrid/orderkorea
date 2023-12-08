import React, { 
  useState 
} from 'react';

import { 
  Table 
} from 'antd';

interface DataType {
  key: React.Key;
  carrier: string;
  price: string;
}

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

const App: React.FC = () => {
  const columns = [
    {
      title: 'Carrier',
      dataIndex: 'carrier',
      key: 'carrier',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      carrier: 'UPS - International Standard',
      price: 'USD 22.99',
    },
    {
      key: 2,
      carrier: 'Korea Post - Express Mail Service',
      price: 'USD 150.00',
    },
    {
      key: 3,
      carrier: 'Korea Post - K-Packet',
      price: 'USD 220.00',
    },
  ]

  return (
    <>
     <Table 
        columns={columns} 
        dataSource={data} 
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
      />
    </>
  );
};

export default App;