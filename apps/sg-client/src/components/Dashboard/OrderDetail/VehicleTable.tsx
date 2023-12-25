import {
  Table,
  Image,
} from 'antd'

import '../../../assets/index.css'

import {
  Vehicle,
  VehicleImage
} from '../../../services/api'

import TableActionDropdown from '../../Shared/TableActionDropdown';


interface VehicleTableProps {
  vehicles: Vehicle[]; 
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles
}) => {

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (key: VehicleImage[]) => {
        
        const images = key.map((image: VehicleImage) => image.image_url)

        return (
          <Image.PreviewGroup
            items={
              images.map((image: string) => {
                return { src: image }
              })
            }
          >
            <Image width={55} src={images[0]} style={{ borderRadius: 8 }}/>
          </Image.PreviewGroup>
        )
      }
    },
    {
      title: 'Make - Model',
      key: 'name',
      render: (key: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { `${record.make} ${record.model}` } </span>
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
    {
      key: 'action',
      width: 50,
      render: (key: string) => {
        return (
          <TableActionDropdown/>
        )
      }
    },
  ];

  return (
    <Table 
      dataSource={vehicles} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default VehicleTable
