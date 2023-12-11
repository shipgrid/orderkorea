import {
  Table,
  Button
} from 'antd'

import '../../../assets/index.css'

interface DataType {
  key: React.Key;
  name: string;
  type: string;
}

import { FaFilePdf } from "react-icons/fa6";

const InventoryTable = () => {

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
      key: 'type',
      render:(key: string, record: object) => (
        <Button>
          <a href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" download>
            Download
          </a>
        </Button>

      )
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      name: 'Bill of Lading',
      type: 'pdf'
    },
    {
      key: 2,
      name: 'Proof of Delivery',
      type: 'pdf'

    },
    {
      key: 3,
      name: 'ProForma Invoice',
      type: 'pdf'
    },
  ]

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

export default InventoryTable
