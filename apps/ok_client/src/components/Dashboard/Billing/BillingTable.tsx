import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tag,
  Button,
  TagLabel,
} from '@chakra-ui/react';

import { 
  FaArrowRight 
} from "react-icons/fa";

import Pagination from '../Pagination/Pagination';

const BillingTableRow = ({ data }:any) => {
  return (
    <Tr style={{ height: 75 }}>
      <Td>{data.Billing}</Td>
      <Td>
        <Tag size={'md'} borderRadius='full' variant='solid' colorScheme='blue'>
          <TagLabel>{data.Email}</TagLabel>
        </Tag>
      </Td>
      <Td>{data.Created}</Td>
      <Td>{data.Total}</Td>
      <Td>
        <Button colorScheme='yellow' size='sm' rightIcon={<FaArrowRight />}>
          {data.Action}
        </Button>
      </Td>
    </Tr>
  );
};

const BillingTable = () => {

  const data = [
    {
      "Billing": 10,
      "Created": "2023-11-21T12:00:00.000Z",
      "Email": "hello@orderkorea.kr",
      "Total": "USD 189.99",
      "Action": "Email Invoice"
    },
    {
      "Billing": 11,
      "Created": "2023-11-21T12:00:00.000Z",
      "Email": "hello@orderkorea.kr",
      "Total": "USD 189.99",
      "Action": "Email Invoice"
    },
    {
      "Billing": 12,
      "Created": "2023-11-21T12:00:00.000Z",
      "Email": "hello@orderkorea.kr",
      "Total": "USD 189.99",
      "Action": "Email Invoice"
    }
  ]

  return (
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple' size='md'>
        <TableCaption>Accurate as of {new Date().toISOString()}</TableCaption>
        <Thead>
          <Tr style={{ height: 75}}>
            <Th>Billing</Th>
            <Th>Created</Th>
            <Th>Email</Th>
            <Th>Total</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((data) => (<BillingTableRow key={data.Billing} data={data} />))}
        </Tbody>
      </Table>
      <Pagination/>
    </TableContainer>
  );
}

export default BillingTable
