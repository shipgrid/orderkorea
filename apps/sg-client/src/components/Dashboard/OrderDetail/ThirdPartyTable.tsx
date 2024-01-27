import {
  Table,
} from 'antd'

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

import '../../../assets/index.css'

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
      render: (key:Address[]) => {

        if (!key || key.length === 0) {
          // Handle the case when keys is undefined, null, or empty
          return null; // or any other fallback UI you prefer
        }
        
        return <p style={{ fontSize: 14 }}> {key[0]?.name} </p> 
      }
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      render:(key: Address[] | undefined ) => {

        if (!key || key.length === 0) {
          return null; 
        }
        
        return (
          <div style={{ display: 'flex', flexDirection:'column' }}>
            <p style={{fontSize: 14}}> 
              {key[0]?.name} <br/>
              {key[0]?.line1} <br/>
              {key[0]?.city}, {key[0]?.state_code}, {key[0]?.country_code} <br/>
              {key[0]?.postal_code}
            </p>
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
      render: (_: string, record: ThirdParty) => {
        return (
          <TableActionDropdown
            actions={[
              {
                label: 'View',
                action: () => { console.log(record) }
              },
              {
                label: 'Edit',
                action: () => { startTransition(() => navigate(`/third-party?order_id=${record.order_id}&address_id=${record.address[0].address_id}&type=${record.type}`)) }
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
