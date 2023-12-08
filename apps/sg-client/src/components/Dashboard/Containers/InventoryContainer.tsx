import {
  Stack,
  Divider
} from '@chakra-ui/react';

import { 
  FiPlus 
} from "react-icons/fi";

import {
  Button,
  Drawer,
  Space,
  Table,
} from 'antd'

import {
  useNavigate
} from 'react-router-dom'

import {
  startTransition,
  useState,
  useEffect,
} from 'react'

import DashboardHeader from '../Layout/DashboardHeader';
import InventoryTable from '../Inventory/InventoryTable';
import DashboardContent from '../Layout/DashboardContent';

interface InventoryRow {
  id: number,
  name: string,
  sku: string,
  imageUrl: string,
  dimensions: string,
  weight: string,
  quantity: number,
  price: string,
}

const InventoryContainer = () => {
  const [open, setOpen] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState<InventoryRow[]>([])

  const columns = [

    {
      title: 'Name (SKU)',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: InventoryRow) => (
        <div>
          <div style={{ fontWeight: 700 }}> {name} </div>
          <div style={{ color: '#999999' }}> {record.sku} </div>
        </div>
      )
    },
    {
      title: 'Dimensions',
      dataIndex: 'dimensions',
      key: 'dimensions',
    },
    {
      title: 'Weight',
      dataIndex: 'weight', 
      key: 'weight',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'price', 
      key: 'price',
    }
  ];

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
      },
    ])
  }, [])

  const navigate = useNavigate()

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Inventory Overview'}
          description={'Update your inventory and ship them out when you are ready'}
          action={[
            <Button key='1' icon={<FiPlus />} onClick={() => startTransition(() => navigate('/create-shipment'))}> Start Shipment </Button>
          ]}
        />
        <Divider my={5}/>
        <InventoryTable />
      </DashboardContent>
      <Drawer
        title={`New Shipment`}
        placement="right"
        size='large'
        onClose={() => setOpen(false)}
        open={open}
        extra={
          <Space>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="primary" onClick={() => setOpen(false)}>
              OK
            </Button>
          </Space>
        }
      >
        <Table 
          dataSource={selectedInventory} 
          columns={columns} 
          pagination={false}
          bordered
          size='small'
        />
      </Drawer>
    </Stack>
  );
}

export default InventoryContainer
