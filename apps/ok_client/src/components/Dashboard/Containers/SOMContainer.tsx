import {
  Stack,
  HStack,
  VStack,
  Divider,
} from '@chakra-ui/react';

import { 
  useState,
  useEffect 
} from 'react'

import { 
  Table,
  Image
} from 'antd'

import {
  FiPlus
} from "react-icons/fi";

import DashboardHeader from '../Layout/DashboardHeader';
import InventoryRow from '../Inventory/InventoryRow';
import ShipmentRow from '../SOM/ShipmentRow';
import OrderSummary from '../SOM/ShipmentOrderSummary'
import DashboardContent from '../Layout/DashboardContent';

import InventoryRow2 from '../Inventory/InventoryRow2';

import PackingInstructionsDrawer from '../Drawers/PackingInstructionsDrawer';
import ShipmentRateDrawer from '../Drawers/ShipmentRateDrawer';

interface InventoryRow {
  id: number,
  name: string,
  sku: string,
  imageUrl: string,
  dimensions: string,
  weight: string,
  quantity: number,
  price: string,
  handleClick: (id:number) => void
}

const SOMContainer = () => {

  const [selectedInventory, setSelectedInventory] = useState<InventoryRow[]>([])
  const [shipmentInventory, setShipmentInventory] = useState<InventoryRow[]>([])
  
  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      render: (imageUrl: string) => (
        <Image width={55} src={imageUrl} style={{ borderRadius: 8 }} alt="Product Image" />
      ),
    },
    {
      title: 'Vendor',
      dataIndex: 'vendor', // Assuming you have a 'vendor' property in your data
      key: 'vendor',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'Dimensions',
      dataIndex: 'dimensions', // Assuming you have a 'dimensions' property in your data
      key: 'dimensions',
    },
    {
      title: 'Weight',
      dataIndex: 'weight', // Assuming you have a 'weight' property in your data
      key: 'weight',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price', // Assuming you have a 'price' property in your data
      key: 'price',
    }
  ];

  const handleClick = (id:number) => {

    const newItem:InventoryRow = {
      id,
      name: 'PlayStation 5',
      sku: 'PS-1310-20',
      imageUrl: 'https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww',
      dimensions: '10cm x 10cm x 10cm',
      weight: '10kg',
      quantity: 1,
      price: 'USD 1000',
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
        name: 'PlayStation 5',
        sku: 'PS-1310-20',
        imageUrl:'https://i5.walmartimages.ca/images/Enlarge/318/403/6000207318403.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF',
        dimensions: '10cm x 10cm x 10cm',
        weight: '10kg',
        quantity: 20,
        price: 'USD 22.99',
        handleClick
      },
      {
        id: 2,
        name: 'Flintstones Chewable Morphine',
        sku: 'PS-1310-20',
        imageUrl:'https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/fli/fli55435/v/21.jpg',
        dimensions: '10cm x 10cm x 10cm',
        weight: '10kg',
        quantity: 20,
        price: 'USD 150.00',
        handleClick
      },
      {
        id: 3,
        name: 'Apple iPhone 13 Pro Max',
        sku: 'PS-1310-20',
        imageUrl: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-finish-select-202207-midnight?wid=2560&hei=1440&fmt=p-jpg&qlt=80&.v=1693064181063',
        dimensions: '10cm x 10cm x 10cm',
        weight: '10kg',
        quantity: 20,
        price: 'USD 220.00',
        handleClick
      },
      {
        id: 4,
        name: 'Dog Food',
        sku: 'PS-1310-20',
        imageUrl: 'https://www.homesalive.ca/media/catalog/product/z/i/ziwipeak-dog-ad-mackerel_1_.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
        dimensions: '10cm x 10cm x 10cm',
        weight: '10kg',
        quantity: 20,
        price: 'USD 180.00',
        handleClick
      },
    ])
  }, [])

  return (
    <Stack>
      <DashboardContent>
        <DashboardHeader
          title='Shipment Order Management'
          description='Select your inventory and start creating your shipments.'
        />
        <Divider my={5}/>
        <HStack align="flex-start" justify="flex-start">
          <VStack align="flex-start">
            <OrderSummary/>
            { shipmentInventory.length ? <Table 
              title={() =>  (
                <div style={{ display: 'flex' }}>
                  <div style={{ margin: 5 }}>
                    <ShipmentRateDrawer 
                      title='Choose Shipping Option'
                      color='purple'
                    />
                  </div>
                  <div style={{ margin: 5 }}>
                    <PackingInstructionsDrawer 
                      title='Packing Instructions (Optional)'
                      color='yellow'
                    />
                  </div>
                </div>
              )}
              dataSource={shipmentInventory} 
              columns={columns} 
              pagination={false}
              style={{ width: '100%' }}
              size='small'
            /> : null }
            {/* <ShipmentRow
              shipmentInventoryRows={shipmentInventory}
            /> */}
            {
              selectedInventory.length && selectedInventory.map((item, i) => {
                return (
                  <div key={i}>
                    <InventoryRow2
                      id={item.id}
                      name={item.name}
                      sku={item.sku}
                      imageUrl={item.imageUrl}
                      dimensions={item.dimensions}
                      weight={item.weight}
                      quantity={item.quantity}
                      handleClick={handleClick}
                      price={item.price}
                    />
                  </div>
                )
              })
            }
          </VStack>
        </HStack>
      </DashboardContent>
    </Stack>
  );
}

export default SOMContainer
