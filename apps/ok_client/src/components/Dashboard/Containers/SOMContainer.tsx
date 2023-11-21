import {
  Stack,
  HStack,
  VStack,
  Heading,
  Flex,
  Box,
  Divider,
  Button,
  Text
} from '@chakra-ui/react';

import { FaArrowRight } from 'react-icons/fa'

import { 
  useState,
  useEffect 
} from 'react'

import InventoryRow from '../Inventory/InventoryRow';
import ShipmentRow from '../Shipment/ShipmentRow';
import OrderSummary from '../Shipment/OrderSummary'

interface InventoryRow {
  id: number,
  handleClick: (id:number) => void
}

interface ShipmentInventoryRow {
  id: number,
}

const SOMContainer = () => {

  const [selectedInventory, setSelectedInventory] = useState<InventoryRow[]>([])
  const [shipmentInventory, setShipmentInventory] = useState<ShipmentInventoryRow[]>([])

  const handleClick = (id:number) => {

    const newItem:InventoryRow = {
      id,
      handleClick
    }
    
    setShipmentInventory([
      ...shipmentInventory,
      newItem
    ])

    const selectedInventoryClone = [ ...selectedInventory ]

    const idToRemove = newItem.id; 
    const indexToRemove = selectedInventoryClone.findIndex(item => item.id === idToRemove)
    selectedInventoryClone.splice(indexToRemove, 1); 

    setSelectedInventory([
      ...selectedInventoryClone
    ])
  }

  useEffect(() => { 
    setSelectedInventory([
      {
        id: 1,
        handleClick
      },
      {
        id: 2,
        handleClick
      },
      {
        id: 3,
        handleClick
      },
      {
        id: 4,
        handleClick
      },
    ])
  }, [])

  return (
    <Stack minH={'100vh'}>
      <Flex justifyContent={'space-between'}>
        <Box>
          <Heading size='md'>
            Shipment Order Management
          </Heading>
          <Text py={1} color='gray'> Select your inventory and start creating your shipments. </Text>
        </Box>
        <Box>
          <Button colorScheme="blue" size="lg" fontSize="md" rightIcon={<FaArrowRight />}>
            Checkout
          </Button>
        </Box>
      </Flex>
      <Divider/>
      <HStack align="flex-start" justify="flex-start">
        <VStack align="flex-start">
          <ShipmentRow
            shipmentInventoryRows={shipmentInventory}
          />
          {
            selectedInventory.length && selectedInventory.map((item, i) => {
              return (
                <div key={i}>
                  <InventoryRow
                    id={item.id}
                    imageUrl='https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww'
                    handleClick={handleClick}
                  />
                </div>
              )
            })
          }
        </VStack>
        <OrderSummary/>
      </HStack>
    </Stack>
  );
}

export default SOMContainer
