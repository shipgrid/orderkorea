import {
  Table,
} from 'antd'

import '../../../assets/index.css'

import {
  ThirdParty,
  Address
} from '../../../services/api'

import TableActionDropdown from '../../Shared/TableActionDropdown';

import {
  useRemoveThirdPartyMutation
} from '../../../services/api'

import {
  startTransition,
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

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

  const navigate = useNavigate();
  const [removeThirdParty, { isLoading }] = useRemoveThirdPartyMutation();

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
      render: (key: string, record: ThirdParty) => {
        return (
          <TableActionDropdown
            actions={[
              {
                label: 'View',
                action: () => { console.log(record) }
              },
              {
                label: 'Edit',
                action: () => { startTransition(() => navigate(`/third-party?order_id=${record.order_id}&address_id=${record.address_id}&type=${record.type}`)) }
              },
              {
                label: 'Remove',
                action: () => removeThirdParty({ third_party_id: record.third_party_id })
              },
            ]}
          />
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
      loading={isLoading}
      rowClassName={rowClassName}
    />
  );
}

export default ThirdPartyTable
