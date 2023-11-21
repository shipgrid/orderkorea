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

const OrderContainer = () => {
  return (
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple'>
        <TableCaption>Accurate as of {new Date().toISOString()}</TableCaption>
        <Thead>
          <Tr>
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
          <Tr>
            <Td>10</Td>
            <Td>Coupang</Td>
            <Td>
            <Tag
              size={'md'}
              borderRadius='full'
              variant='solid'
              colorScheme='yellow'
            >
              <TagLabel>Pending</TagLabel>
            </Tag>
            </Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>
              <HStack>
                <FiPackage
                  color="red" // Set the icon color
                />
              <Text color='red'> Over Received </Text>
              </HStack>
            </Td>
            <Td>
              <HStack>
                <Progress colorScheme='red' size='sm' value={100} w={'60%'}/>
                <Text> 6/3 </Text>
              </HStack>
            </Td>
            <Td>
              <Text> USD 139.99 </Text>
            </Td>
          </Tr>
          <Tr>
            <Td>11</Td>
            <Td>Coupang</Td>
            <Td>
              <Tag
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
              >
                <TagLabel>Complete</TagLabel>
              </Tag>
            </Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>
              <HStack>
                <FiPackage
                  color="gray" 
                />
              <Text color='gray'> Partially Received </Text>
              </HStack>
            </Td>
            <Td>
            <HStack>
                <Progress colorScheme='green' size='sm' value={70} w={'60%'}/>
                <Text> 80/120 </Text>
              </HStack>
            </Td>
            <Td> USD 120.99</Td>
          </Tr>
          <Tr>
            <Td>12</Td>
            <Td>Coupang</Td>
            <Td>
              <Tag
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='yellow'
              >
                <TagLabel>Pending</TagLabel>
              </Tag>
            </Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>
              <HStack>
                <FiPackage
                  color="black" // Set the icon color
                />
              <Text color='black'> Received </Text>
              </HStack>
            </Td>
            <Td>
            <HStack>
                <Progress colorScheme='green' size='sm' value={70} w={'60%'}/>
                <Text> 60/60 </Text>
              </HStack>
            </Td>
            <Td> USD 59.99 </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default OrderContainer
