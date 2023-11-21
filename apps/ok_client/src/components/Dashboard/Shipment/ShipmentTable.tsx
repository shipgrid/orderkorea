import {
  Stack,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Image,
  Flex,
  Box,
  Heading,
  Tag,
  Text,
  Button,
  Progress,
  TagLabel,
  HStack,
  Divider
} from '@chakra-ui/react';

const ShipmentTable = () => {
  return (
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple'>
        <TableCaption>Accurate as of {new Date().toISOString()}. All currency values records in USD. All measurements measured in metric units.</TableCaption>
        <Thead>
          <Tr>
            <Th>Shipment</Th>
            <Th>Carrier - Service Code</Th>
            <Th>Ordered</Th>
            <Th>Shipment</Th>
            <Th>Tracking </Th>
            <Th>Total Cost</Th>
            <Th>Dimensions (L x W x H)</Th>
            <Th>Weight</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>10</Td>
            <Td>Korea Post - Express Mail Service</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>
              <Tag
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='yellow'
              >
                <TagLabel>1ZCYX29101283810</TagLabel>
              </Tag>
            </Td>
            <Td> USD 120.99</Td>
            <Td>
              10cm x 10cm x 10cm
            </Td>
            <Td>
              5.5kg
            </Td>
          </Tr>
          <Tr>
            <Td>11</Td>
            <Td>Korea Post - Express Mail Service</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>
              <Tag
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='yellow'
              >
                <TagLabel>1ZCYX29101283810</TagLabel>
              </Tag>
            </Td>
            <Td> USD 120.99</Td>
            <Td>
              10cm x 10cm x 10cm
            </Td>
            <Td>
              5.5kg
            </Td>
          </Tr>
          <Tr>
            <Td>12</Td>
            <Td>Korea Post - Express Mail Service</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>{new Date().toISOString()}</Td>
            <Td>
              <Tag
                size={'md'}
                borderRadius='full'
                variant='solid'
                colorScheme='yellow'
              >
                <TagLabel>1ZCYX29101283810</TagLabel>
              </Tag>
            </Td>
            <Td> USD 120.99</Td>
            <Td>
              10cm x 10cm x 10cm
            </Td>
            <Td>
              5.5kg
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ShipmentTable
