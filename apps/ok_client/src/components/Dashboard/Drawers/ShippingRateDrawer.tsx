import React, { 
  useState 
} from 'react';

import { 
  Button, 
  Drawer, 
  Space, 
  Table 
} from 'antd';

import { 
  RiShipLine,
  RiSave3Line
} from "react-icons/ri";

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
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


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
      <Button onClick={showDrawer} icon={<RiShipLine />}>
        Shipping Options
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} icon={<RiSave3Line />}>
              Save
            </Button>
          </Space>
        }
      >
       <Table 
        columns={columns} 
        dataSource={data} 
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        />
      </Drawer>
    </>
  );
};

export default App;