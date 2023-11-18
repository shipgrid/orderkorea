import {
  Stack,
} from '@chakra-ui/react';

import { 
  useState,
  useEffect 
} from 'react'

import InventoryRow from '../Inventory/InventoryRow';
import ShipmentRow from '../Shipment/ShipmentRow';

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
    console.log(newItem)
    // const isDuplicate = selectedInventory.some((item) => item?.id === newItem.id);
    // if(!isDuplicate) {
    //   setShipmentInventory([
    //     ...shipmentInventory,
    //     newItem
    //   ])
    // }
    setShipmentInventory([
      ...shipmentInventory,
      newItem
    ])

    const selectedInventoryClone = [ ...selectedInventory ]
    const indexToRemove = newItem.id; // Index of the object to remove
    selectedInventoryClone.splice(indexToRemove, 1); // Removes one element at the specified index
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
      <ShipmentRow
        inventoryRows={shipmentInventory}
      />
      {
        selectedInventory.length && selectedInventory.map((item, i) => {
          return (
            <div key={i}>
              <InventoryRow
                id={item.id}
                handleClick={handleClick}
              />
            </div>
          )
        })
      }
    </Stack>
  );
}

export default SOMContainer
