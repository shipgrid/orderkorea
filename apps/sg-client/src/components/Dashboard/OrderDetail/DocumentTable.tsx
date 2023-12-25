import {
  Table,
  Button
} from 'antd'

import '../../../assets/index.css'

import TableActionDropdown from '../../Shared/TableActionDropdown';

import {
  Document
} from '../../../services/api'

import { FaFilePdf } from "react-icons/fa6";

interface DocumentTableProps {
  documents: Document[]; 
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents
}) => {

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      render: (key: string[]) => {
        return (
          <div style={{ display: 'flex' }}>
            <FaFilePdf style={{ fontSize: 20, color: 'teal' }}/>
            <span style={{ marginLeft: 10 }}> {key} </span>
          </div>
        )
      }
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type' 
    },
    {
      title: 'Download',
      dataIndex: 'file_url',
      key: 'type',
      render:(key: string, record: object) => (
        <Button>
          <a href={key} download>
            Download
          </a>
        </Button>
      )
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
      dataSource={documents} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default DocumentTable
