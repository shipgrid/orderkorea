import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Button,
  Center,
} from '@chakra-ui/react';

import { 
  FaArrowRight 
} from "react-icons/fa";

import Pagination from '../Pagination/Pagination';

const InventoryTableRow = ({ data }: any) => {
  return (
    <Tr style={{ height: 75}}>
      <Td>
        <Center>
          <Image
            objectFit='cover'
            maxW={{ base: '45px' }}
            maxH={{ base: '45px' }}
            minW={{ base: '45px' }}
            minH={{ base: '45px' }}

            src={data.image}
            alt={data.name}
            borderRadius="md" 
          />
        </Center>
      </Td>
      <Td>{data.vendor}</Td>
      <Td>{data.name}</Td>
      <Td>{data.sku}</Td>
      <Td>{data.createdOn}</Td>
      <Td>{data.location}</Td>
      <Td>{data.quantity}</Td>
      <Td>{data.unitPrice}</Td>
      <Td><Button colorScheme='yellow' size='sm' rightIcon={<FaArrowRight />}> Add to Shipment </Button></Td>
    </Tr>
  )
}

const InventoryTable = () => {

  const data = [
    {
      image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww',
      vendor: 'Amazon',
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      createdOn: new Date().toISOString(),
      location: '34-010-A',
      quantity: 10,
      unitPrice: 'USD 39.99',
    },
    {
      image: 'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/04/06/17/9/f7c15ab1-426a-419a-a8ab-ee572dc431aa.jpg',
      vendor: 'Amazon',
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      createdOn: new Date().toISOString(),
      location: '34-010-A',
      quantity: 10,
      unitPrice: 'USD 39.99',
    },
    {
      image: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww',
      vendor: 'Amazon',
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      createdOn: new Date().toISOString(),
      location: '34-010-A',
      quantity: 10,
      unitPrice: 'USD 39.99',
    },
  ]

  return (
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple' size='md'>
        <TableCaption>Accurate as of {new Date().toISOString()}</TableCaption>
        <Thead>
          <Tr style={{ height: 75}}>
            <Th>Image</Th>
            <Th>Vendor</Th>
            <Th>Name</Th>
            <Th>SKU</Th>
            <Th>Created On</Th>
            <Th>Location</Th>
            <Th>Quantity</Th>
            <Th>Unit Price</Th>
            <Th>Select</Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map((item, index) => <InventoryTableRow key={index} data={item} />) }
        </Tbody>
      </Table>
      <Pagination />
    </TableContainer>
  );
}

export default InventoryTable
