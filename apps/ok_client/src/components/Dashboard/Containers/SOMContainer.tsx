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
  Image,
  Button,
  Empty,
  Tag,
  Popconfirm,
  InputNumber,
  AutoComplete, 
  Input,
  Descriptions,
} from 'antd'

import type { 
  SelectProps 
} from 'antd/es/select';

import { 
  IoIosArrowDown 
} from "react-icons/io";

import { 
  MdOutlineShoppingCartCheckout 
} from "react-icons/md";

import DashboardHeader from '../Layout/DashboardHeader';
import OrderSummary from '../SOM/ShipmentOrderSummary'
import DashboardContent from '../Layout/DashboardContent';
import PackingInstructionsDrawer from '../Drawers/PackingInstructionsDrawer';
import ShipmentRateDrawer from '../Drawers/ShippingRateDrawer'
import Grid from '../Layout/Grid';

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

  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };
  
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
      render:(quantity: number) => (
        <Popconfirm
          title="How many units would you like to add to the shipment?"
          description={
            <div style={{ padding: 10 }}>
              <InputNumber style={{ width: '100%' }}/>
            </div>
          }
          okText={<span> Yes </span>}
          cancelText="No"
        >
          <Button icon={<IoIosArrowDown/>}> Qty: {quantity} </Button>
        </Popconfirm>
      )
    },
    {
      title: 'Unit Price',
      dataIndex: 'price', 
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

  const searchResult = (query: string) => {

    return selectedInventory.filter(item => item.name.toLowerCase().includes(query.toLowerCase())).map((item) => {

      return {
        value: item.name,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
            onClick={() => handleClick(item.id)}
          >
            <Descriptions column={1} size='small'>
              <Descriptions.Item label="Name"> {item.name} </Descriptions.Item>
              <Descriptions.Item label="SKU"> {item.sku} </Descriptions.Item>
              <Descriptions.Item label="Dimensions"> {item.dimensions} </Descriptions.Item>
              <Descriptions.Item label="Weight"> {item.weight} </Descriptions.Item>
            </Descriptions>
            <hr className="m-0" />
          </div>
        ),
      };
    })
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

    setShipmentInventory([
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
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title='Shipment Order Management'
          description='Select your inventory and start creating your shipments.'
        />
        <Divider my={5}/>
        <OrderSummary/>
            <Grid
              title="Add Inventory and create shipments"
              actionButtons={[
                <div>
                  <AutoComplete
                    popupMatchSelectWidth={450}
                    style={{ width: 300 }}
                    options={options}
                    onSelect={onSelect}
                    onSearch={handleSearch}
                    size="small"
                  >
                    <Input.Search size="small" placeholder="Search Inventory"/>
                  </AutoComplete>
                </div>
     
              ]}
              content={
                 shipmentInventory.length ? (
                  <Grid
                    title="Shipment ID: 10162427-549a-43a8-b0e7"
                    actionButtons={[
                      <ShipmentRateDrawer 
                      />,
                      <PackingInstructionsDrawer 
                      />,
                      <Button icon={<MdOutlineShoppingCartCheckout />}> Checkout & Ship </Button>
                    ]}
                    content={
                      <div style={{ flex: 1}}>
                        <div>
                          <Tag style={{ marginBottom: 5 }} closeIcon>Korea Post - K-Packet</Tag>
                          <Tag style={{ marginBottom: 5 }} closeIcon>Gift Wrapping</Tag>
                          <Tag style={{ marginBottom: 5 }} closeIcon>Inclusions Only</Tag>
                          <Tag style={{ marginBottom: 5 }} closeIcon>Add Bubble Wrap</Tag>
                        </div>
                        <Table 
                          dataSource={shipmentInventory} 
                          columns={columns} 
                          pagination={false}
                          size='small'
                          style={{ minWidth: 1200 }}
                        />
                      </div>
                    }
                  />
                  ) : <Empty description={'Search your inventory and add it to the shipment'} style={{ minWidth: 1200 }}/> 
              }
            />
      </DashboardContent>
    </Stack>
  );
}

export default SOMContainer
