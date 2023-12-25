import {
  Table,
} from 'antd'

import '../../../assets/index.css'

import {
  ThirdParty,
  Address
} from '../../../services/api'

import TableActionDropdown from '../../Shared/TableActionDropdown';

interface Contact {
  name: string;
  phone: string;
  email: string;
}

interface ThirdPartyTableProps {
  thirdParties: ThirdParty[]; 
}

const ThirdPartyTable: React.FC<ThirdPartyTableProps> = ({
  thirdParties
}) => {

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
      dataIndex: 'address',
      key: 'name',
      render: (key:Address) => (
        <p style={{ fontSize: 14 }}> {key.name} </p>
      )
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
            <p style={{fontSize: 12, color: 'gray'}}> {key?.city}, {key?.state_code}, {key?.country_code} </p>
            <p style={{fontSize: 12, color: 'gray'}}> {key?.postal_code} </p>
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
    {
      key: 'action',
      width: 50,
      render: (key: string) => {
        return (
          <TableActionDropdown/>
        )
      }
    },
  ];

  return (
    <Table 
      dataSource={thirdParties} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default ThirdPartyTable
