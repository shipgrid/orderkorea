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

const InventoryTable = () => {
  return (
    
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple' size='md'>
        <TableCaption>Accurate as of {new Date().toISOString()}</TableCaption>
        <Thead>
          <Tr>
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
          <Tr>
            <Td>
              <Center>
                <Image
                  objectFit='cover'
                  maxW={{ base: '45px' }}
                  maxH={{ base: '45px' }}
                  minW={{ base: '45px' }}
                  minH={{ base: '45px' }}

                  src={'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww'}
                  alt='PlayStation 5'
                  borderRadius="md" 
                />
              </Center>
            </Td>
            <Td>Amazon</Td>
            <Td>PlayStation 5</Td>
            <Td>PS-1310-20</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>34-010-A</Td>
            <Td>10</Td>
            <Td>USD 39.99</Td>
            <Td><Button colorScheme='yellow' size='md'> Add to Shipment </Button></Td>
          </Tr>
          <Tr>
            <Td>
              <Center>
                <Image
                  objectFit='cover'
                  maxW={{ base: '45px' }}
                  maxH={{ base: '45px' }}
                  minW={{ base: '45px' }}
                  minH={{ base: '45px' }}

                  src={'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/04/06/17/9/f7c15ab1-426a-419a-a8ab-ee572dc431aa.jpg'}
                  alt='PlayStation 5'
                  borderRadius="md" 
                />
              </Center>
            </Td>
            <Td>Amazon</Td>
            <Td>PlayStation 5</Td>
            <Td>PS-1310-20</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>34-010-A</Td>
            <Td>10</Td>
            <Td>USD 39.99</Td>
            <Td><Button colorScheme='yellow' size='md'> Add to Shipment </Button></Td>
          </Tr>
          <Tr>
            <Td>
              <Center>
                <Image
                  objectFit='cover'
                  maxW={{ base: '45px' }}
                  maxH={{ base: '45px' }}
                  minW={{ base: '45px' }}
                  minH={{ base: '45px' }}

                  src={'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww'}
                  alt='PlayStation 5'
                  borderRadius="md" 
                />
              </Center>
            </Td>
            <Td>Amazon</Td>
            <Td>PlayStation 5</Td>
            <Td>PS-1310-20</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>34-010-A</Td>
            <Td>10</Td>
            <Td>USD 39.99</Td>
            <Td><Button colorScheme='yellow' size='md'> Add to Shipment </Button></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default InventoryTable
