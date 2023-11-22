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
  TagLabel,
} from '@chakra-ui/react';

import Pagination from '../Pagination/Pagination';

const ShipmentTableRow = ({ data }:any) => {
  return (
    <Tr style={{ height: 75 }}>
      <Td>{data.shipmentId}</Td>
      <Td>{data.carrierService}</Td>
      <Td>{data.shipmentDate}</Td>
      <Td>
        <Tag size={'md'} borderRadius='full' variant='solid' colorScheme='yellow'>
          <TagLabel>{data.trackingNumber}</TagLabel>
        </Tag>
      </Td>
      <Td>{data.totalCost}</Td>
      <Td>{data.dimensions}</Td>
      <Td>{data.weight}</Td>
    </Tr>
  );
};

const ShipmentTable = () => {

  const data = [
    {
      shipmentId: 10,
      carrierService: 'Korea Post - Express Mail Service',
      shipmentDate: new Date().toISOString(),
      trackingNumber: '1ZCYX29101283810',
      totalCost: 'USD 120.99',
      dimensions: '10cm x 10cm x 10cm',
      weight: '5.5kg',
    },
    {
      shipmentId: 11,
      carrierService: 'Korea Post - Express Mail Service',
      shipmentDate: new Date().toISOString(),
      trackingNumber: '1ZCYX29101283810',
      totalCost: 'USD 120.99',
      dimensions: '10cm x 10cm x 10cm',
      weight: '5.5kg',
    },
    {
      shipmentId: 12,
      carrierService: 'Korea Post - Express Mail Service',
      shipmentDate: new Date().toISOString(),
      trackingNumber: '1ZCYX29101283810',
      totalCost: 'USD 120.99',
      dimensions: '10cm x 10cm x 10cm',
      weight: '5.5kg',
    },
  ];

  return (
    <TableContainer bg='white' borderRadius={'md'}>
      <Table variant='simple'>
        <TableCaption>Accurate as of {new Date().toISOString()}. All currency values records in USD. All measurements measured in metric units.</TableCaption>
        <Thead>
          <Tr style={{ height: 75}}>
            <Th>Shipment</Th>
            <Th>Carrier - Service Code</Th>
            <Th>Shipment</Th>
            <Th>Tracking </Th>
            <Th>Total Cost</Th>
            <Th>Dimensions (L x W x H)</Th>
            <Th>Weight</Th>
          </Tr>
        </Thead>
        <Tbody>
          { data.map((shipment:any) => <ShipmentTableRow data={shipment} />) }
        </Tbody>
      </Table>
      <Pagination/>
    </TableContainer>
  );
}

export default ShipmentTable
