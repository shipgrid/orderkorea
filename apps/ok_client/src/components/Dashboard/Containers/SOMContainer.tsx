import {
  Stack,
} from '@chakra-ui/react';

import { useState } from 'react'

import InventoryRow from '../Inventory/InventoryRow';

interface InventoryItem {
  id: number
}

const SOMContainer = () => {

  const [selectedInventory, setSelectedInventory] = useState<InventoryItem[]>([])

  const handleClick = (id:number) => {

    const newItem:InventoryItem = {
      id: id
    }

    const isDuplicate = selectedInventory.some((item) => item.id === newItem.id);

    if(!isDuplicate) {
      setSelectedInventory([
        ...selectedInventory,
        newItem
      ])
    }
  }
  console.log(selectedInventory)
  return (
    <Stack minH={'100vh'}>
      <InventoryRow id={1} handleClick={handleClick}/>
      <InventoryRow id={2} handleClick={handleClick}/>
      <InventoryRow id={3} handleClick={handleClick}/>
      <InventoryRow id={4} handleClick={handleClick}/>
    </Stack>
  );
}

export default SOMContainer
