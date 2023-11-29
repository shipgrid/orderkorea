import { 
  useState,
  useEffect 
} from 'react'

import { 
  AutoComplete, 
  Input,
  Descriptions,
} from 'antd'

import type { 
  SelectProps 
} from 'antd/es/select';

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

const SOMContainer = () => {

  const [selectedInventory, setSelectedInventory] = useState<InventoryRow[]>([])

  const [options, setOptions] = useState<SelectProps<object>['options']>([]);

  const handleSearch = (value: string) => {
    setOptions(value ? searchResult(value) : []);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

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
            // onClick={() => handleClick(item.id)}
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

  return (
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
  );
}

export default SOMContainer
