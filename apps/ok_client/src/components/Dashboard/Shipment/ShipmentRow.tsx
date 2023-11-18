import {
  Button,
  Heading,
  Card,
  Divider,
  ButtonGroup,
  CardHeader,
} from '@chakra-ui/react';

import {
  useEffect,
} from 'react'

import ShipmentInventoryRow from './ShipmentInventoryRow';

interface InventoryRow {
  id: number,
}

interface ShipmentProps {
  inventoryRows?: InventoryRow[];
}

const Shipment = ({
  inventoryRows
}:ShipmentProps) => {

  useEffect(() =>{

  }, [inventoryRows.length])

  return (
    <>
      <Heading size='sm' >
        Shipment #1 
      </Heading>
      <Card
        direction={{ base: 'column' }}
        variant='outline'
        maxW={{ base: '900px' }}
        backgroundColor={'none'}
        style={{ 
          borderStyle: 'dotted',
          borderWidth: '4px',
          borderColor: 'gray.800',
          cursor: 'pointer', 
          // display: 'none' 
        }}
      >
      <CardHeader flexDirection={'row-reverse'}>
        <ButtonGroup>
          <Button colorScheme='green'> Add Packing Instructions </Button>
          <Button colorScheme='purple'> Get Shipment Rate </Button>
          <Button colorScheme='blue'> Submit Shipment </Button>
        </ButtonGroup>
      <Divider py={2} px={2}/>
      </CardHeader>
      {inventoryRows && inventoryRows.map((row) => (
        <div key={row.id}>
          <ShipmentInventoryRow
            id={row.id}
          />        
        </div>
      ))}
      </Card>
    </>
  );
}

export default Shipment