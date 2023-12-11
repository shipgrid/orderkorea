import {
  Table,
  Image,
} from 'antd'

import '../../../assets/index.css'

interface DataType {
  key: React.Key;
  images: string[];
  make: string;
  model: string;
  year: string; 
  exterior_color: string;
  vin_number:string;
  price: string;
  mileage: string;
}

const InventoryTable = () => {

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (key: string[]) => {
        return (
          <Image.PreviewGroup
            items={
              key.map((image: string) => {
                return { src: image }
              })
            }
          >
            <Image width={55} src={key[0]} style={{ borderRadius: 8 }}/>
          </Image.PreviewGroup>
        )
      }
    },
    {
      title: 'Make - Model',
      key: 'name',
      render: (key: string, record: object) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> Hyundai Elentra </span>
          </div>
        )
      }
    },
    {
      title: 'Year',
      key: 'year',
      dataIndex: 'year'
    },
    {
      title: 'Exterior Color',
      key: 'exterior_color',
      dataIndex: 'exterior_color'
    },
    {
      title: 'Mileage',
      key: 'mileage',
      dataIndex: 'mileage'
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price'
    },
    {
      title: 'Vin Number',
      key: 'vin_number',
      dataIndex: 'vin_number'
    },
  ];

  const data: DataType[] = [
    {
      key: 1,
      images: [
        'https://ci.encar.com/carpicture/carpicture03/pic3593/35931075_001.jpg?impolicy=heightRate&rh=480&cw=640&ch=480&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_03.png&t=20230912193136'
      ],
      make: 'Mazda',
      model: 'Mazda 3',
      year: '2023',
      exterior_color: 'Black',
      vin_number: '123456789',
      price: 'USD 10,000',
      mileage: '59,728km',
    },
    {
      key: 2,
      images: [
        'https://www.usnews.com/cmsmedia/56/44/fc92b01c4006b46932e72ac46fe8/2023-hyundai-tucson-hybrid-8.jpg'
      ],
      make: 'Mazda',
      model: 'Mazda 3',
      year: '2023',
      exterior_color: 'Black',
      vin_number: '123456789',
      price: 'USD 10,000',
      mileage: '59,728km',
    },
    {
      key: 3,
      images: [
        'https://ci.encar.com/carpicture/carpicture03/pic3593/35931075_001.jpg?impolicy=heightRate&rh=480&cw=640&ch=480&cg=Center&wtmk=https://ci.encar.com/wt_mark/w_mark_03.png&t=20230912193136'
      ],
      make: 'Mazda',
      model: 'Mazda 3',
      year: '2023',
      exterior_color: 'Black',
      vin_number: '123456789',
      price: 'USD 10,000',
      mileage: '59,728km',
    },
  ]

  return (
    <Table 
      dataSource={data} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default InventoryTable
