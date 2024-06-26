import {
  Table,
  Button,
} from 'antd'

import { 
  FaFilePdf 
} from "react-icons/fa6";

import {
  useRemoveDocumentMutation,
  Document
} from '../../../services/api'

import TableActionDropdown from '../../Shared/TableActionDropdown';
import '../../../assets/index.css'

interface DocumentTableProps {
  documents: Document[]; 
}

const DocumentTable: React.FC<DocumentTableProps> = ({
  documents
}) => {

  const [removeDocument,  { isLoading } ] = useRemoveDocumentMutation();

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
      title: 'Download',
      dataIndex: 'file_url',
      key: 'type',
      render:(key: string, _: Document) => (
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
      render: (_: string, record: any) => {
        return (
          <TableActionDropdown
            actions={[
              {
                label: 'Remove',
                action: () => removeDocument({
                  order_id: record.order_id,
                  document_id: record.document_id
                })
              },
            ]}
          />
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
      loading={isLoading}
    />
  );
}

export default DocumentTable
