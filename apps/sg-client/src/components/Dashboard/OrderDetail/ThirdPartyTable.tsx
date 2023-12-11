import {
  Table,
  Image,
} from 'antd'

import '../../../assets/index.css'

interface Address {
  name: string;
  line1: string;
  countryCode: string;
  stateCode: string;
  city: string;
  postalCode: string;
}

interface Contact {
  name: string;
  phone: string;
  email: string;
}

interface DataType {
  key: React.Key;
  type: string;
  name: string;
  address: Address;
  contact: Contact;
}





const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};

const InventoryTable = () => {

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render:(key: Address) => {
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
      title: 'Contact Info',
      dataIndex: 'contact',
      key: 'contact',
      render: (key: Contact) => {
        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> {key?.name} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.phone} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.email} </p>
          </div>
        )
      }
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      type: 'Shipper',
      name: 'Joe Fong',
      address: {
        name: 'Joe Fong (Richmond, BC)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      contact: {
        name: 'Joe Fong (Richmond, BC)',
        phone: '604-123-4567',
        email: 'joecofg@gmail.com'
      },
    },
    {
      key: 1,
      type: 'Consignee',
      name: 'Monica Wu',
      address: {
        name: 'Joe Fong (Richmond, BC)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      contact: {
        name: 'Joe Fong (Richmond, BC)',
        phone: '604-123-4567',
        email: 'joecofg@gmail.com'
      },
    },
    {
      key: 1,
      type: 'Delivery Destination',
      name: 'Nigera Auto 1 Dealership',
      address: {
        name: 'Joe Fong (Richmond, BC)',
        line1: '7831 Garden City Road',
        countryCode: 'CA',
        stateCode: 'BC',
        city: 'Richmond',
        postalCode: 'V6Y 0K2',
      },
      contact: {
        name: 'Joe Fong (Richmond, BC)',
        phone: '604-123-4567',
        email: 'joecofg@gmail.com'
      },
    },
  ]

  return (
    <Table 
      rowSelection={{
        ...rowSelection,
      }}
      dataSource={data} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default InventoryTable
