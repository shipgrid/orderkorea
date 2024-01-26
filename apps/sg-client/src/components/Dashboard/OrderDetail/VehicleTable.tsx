import {
  Table,
  Image,
} from 'antd'

import {
  Vehicle,
  VehicleImage
} from '../../../services/api'

import {
  startTransition,
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import { 
  formatNumberWithCommas
} from '../../../utils/format_string'

import TableActionDropdown from '../../Shared/TableActionDropdown';
import '../../../assets/index.css'

interface VehicleTableProps {
  vehicles: Vehicle[]; 
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  vehicles
}) => {

  const navigate = useNavigate()

  const rowClassName = () => {
    return 'fixed-height-row';
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (_: any, record: Vehicle) => {
        
        const images = record.images?.map((image: VehicleImage) => image.image_url) ?? [];

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
      render: (_: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { `${record?.make.name} ${record?.model.name}` } </span>
          </div>
        )
      }
    },
    {
      title: 'Year',
      key: 'year',
      render: (_: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.year } </span>
          </div>
        )
      }
    },
    {
      title: 'Exterior Color',
      key: 'exterior_color',
      render: (_: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.exterior_color.name } </span>
          </div>
        )
      }
    },
    {
      title: 'Mileage',
      key: 'mileage',
      render: (_: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { formatNumberWithCommas(record?.mileage) }km </span>
          </div>
        )
      }
    },
    {
      title: 'Price',
      key: 'price',
      render: (_: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> ${ formatNumberWithCommas(record?.fees.vehicle_price) } </span>
          </div>
        )
      }
    },
    {
      title: 'Vin Number',
      key: 'vin_number',
      render: (_: string, record: Vehicle) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.vin_number } </span>
          </div>
        )
      }
    },
    {
      key: 'action',
      width: 50,
      render: (_: string, record: Vehicle) => {
        return (
          <TableActionDropdown
            actions={[
              {
                label: 'View',
                action: () => startTransition(() => navigate(`/vehicle?vehicle_id=${record?.vehicle_id}`))
              },
            ]}
          />
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
