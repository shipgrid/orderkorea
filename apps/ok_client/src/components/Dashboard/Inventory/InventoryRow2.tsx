import { 
  Card,
  Image,
  Divider,
  Descriptions,
  Radio,
  Button,
  Form, 
  Input,
  InputNumber,
  Popconfirm
} from 'antd';

import { 
  FiPlus 
} from "react-icons/fi";

type FieldType = {
  quantity?: number
};

import type { DescriptionsProps } from 'antd';

interface InventoryRowProps {
  id: number,
  imageUrl: string,
  name: string,
  sku: string,
  dimensions: string,
  weight: string,
  quantity: number,
  price: string,
  handleClick: (id:number) => void
}

const InventoryRow: React.FC<InventoryRowProps> = ({
  id,
  name,
  sku,
  imageUrl,
  handleClick,
  dimensions,
  weight,
  quantity,
  price
}:InventoryRowProps) => {


  const items: DescriptionsProps['items'] = [
    {
      key: '0',
      label: 'Image',
      children: <Image width={65} src={imageUrl}/>,
    },
    {
      key: '1',
      label: 'Product',
      children: `${name} (${sku})`,
    },
    {
      key: '2',
      label: 'Quantity',
      children: `${quantity}`,
    },
    {
      key: '3',
      label: 'Dimensions',
      children: `${dimensions}`,
    },
    {
      key: '4',
      label: 'Weight',
      children: `${weight}`,
    },
  ];

  return (
    <Card
      style={{ cursor: 'pointer' }}
      actions={[
        <Popconfirm
          title="How many units would you like to add to the shipment?"
          description={
            <div style={{ padding: 10 }}>
              <InputNumber style={{ width: '100%' }}/>
            </div>
          }
          okText={<span onClick={() => handleClick(id)}> Yes </span>}
          cancelText="No"
        >
          <Button style={{ width: '90%'}} icon={<FiPlus/>}> Add to Shipment </Button>
        </Popconfirm>
      ]}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Descriptions 
            layout="vertical" 
            bordered 
            size={'small'}
            items={items} 
            column={5}
            style={{ minWidth: 1200, width: '100%' }}
          />
        </div>
      </div>
    </Card>
  );
}

export default InventoryRow