import { 
  MdOutlineMailOutline 
} from "react-icons/md";

import {
  Button,
  Table
} from 'antd'

const BillingTable = () => {

  const columns = [
    {
      title: 'Billing',
      dataIndex: 'billing',
      key: 'billing',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: () => <Button icon={<MdOutlineMailOutline />}> Email Invoice </Button>
    },
  ];
  

  const data = [
    {
      "billing": 10,
      "created": "2023-11-21T12:00:00.000Z",
      "email": "hello@orderkorea.kr",
      "total": "USD 189.99",
      "action": "Email Invoice"
    },
    {
      "billing": 11,
      "created": "2023-11-21T12:00:00.000Z",
      "email": "hello@orderkorea.kr",
      "total": "USD 189.99",
      "action": "Email Invoice"
    },
    {
      "billing": 12,
      "created": "2023-11-21T12:00:00.000Z",
      "email": "hello@orderkorea.kr",
      "total": "USD 189.99",
      "action": "Email Invoice"
    }
  ]

  return (
    <>
      <Table dataSource={data} columns={columns} />
    </>
  );
}

export default BillingTable
