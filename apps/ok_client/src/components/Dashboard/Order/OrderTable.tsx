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
  Text,
  Progress,
  TagLabel,
  HStack,
} from '@chakra-ui/react';

import { 
  FiPackage 
} from 'react-icons/fi'

import Pagination from '../Pagination/Pagination';

const OrderTableRow = ({ data }: any) => {

  return (
    <Tr style={{ height: 75}}>
      <Td> { data.id } </Td>
      <Td> { data.vendor }</Td>
      <Td>
      <Tag
        size={'md'}
        borderRadius='full'
        variant='solid'
        colorScheme='yellow'
      >
        <TagLabel>{data.orderStatus}</TagLabel>
      </Tag>
      </Td>
      <Td>{data.created}</Td>
      <Td>{data.expected}</Td>
      <Td>
        <HStack>
          <FiPackage
            color="red" 
          />
        <Text color='red'> {data.inventoryStatus} </Text>
        </HStack>
      </Td>
      <Td>
        <HStack>
          <Progress colorScheme='red' size='sm' value={100} w={'60%'}/>
          <Text> {data.receivedOrdered} </Text>
        </HStack>
      </Td>
      <Td>
        <Text> {data.totalCost} </Text>
      </Td>
    </Tr>
  )
}

const OrderTable = () => {

  const data = [
    {
      id: 10,
      vendor: 'Coupang',
      orderStatus: 'Pending',
      created: new Date().toISOString(),
      expected: new Date().toISOString(),
      inventoryStatus: 'Over Received',
      receivedOrdered: '6/3',
      totalCost: 'USD 139.99',
    },
    {
      id: 11,
      vendor: 'Coupang',
      orderStatus: 'Complete',
      created: new Date().toISOString(),
      expected: new Date().toISOString(),
      inventoryStatus: 'Partially Received',
      receivedOrdered: '80/120',
      totalCost: 'USD 120.99',
    },
    {
      id: 12,
      vendor: 'Coupang',
      orderStatus: 'Pending',
      created: new Date().toISOString(),
      expected: new Date().toISOString(),
      inventoryStatus: 'Received',
      receivedOrdered: '60/60',
      totalCost: 'USD 59.99',
    },
  ];

  return (
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple' size={'md'}>
        <TableCaption>Accurate as of {new Date().toISOString()}</TableCaption>
        <Thead>
          <Tr style={{ height: 75}}>
            <Th>Order</Th>
            <Th>Vendor</Th>
            <Th>Order Status</Th>
            <Th>Created</Th>
            <Th>Expected</Th>
            <Th>Inventory Status</Th>
            <Th>Received / Ordered </Th>
            <Th>Total Cost </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((data) => <OrderTableRow key={data.id} data={data} />)}
        </Tbody>
      </Table>
      <Pagination/>
    </TableContainer>
  );
}

export default OrderTable
