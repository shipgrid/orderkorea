import {
  Table,
  Image,
} from 'antd'

import {
  Reservation,
  VehicleImage
} from '../../../services/api'

import {
  startTransition,
} from 'react'

import {
  useNavigate
} from 'react-router-dom'

import TableActionDropdown from '../../Shared/TableActionDropdown';
import '../../../assets/index.css'

interface VehicleTableProps {
  reservations: Reservation[]; 
}

const VehicleTable: React.FC<VehicleTableProps> = ({
  reservations
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
      render: (_: any, record: Reservation) => {
        
        const images = record.vehicle?.images?.map((image: VehicleImage) => image.image_url) ?? [];

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
      render: (_: string, record: Reservation) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { `${record?.vehicle?.make.name} ${record?.vehicle?.model.name}` } </span>
          </div>
        )
      }
    },
    {
      title: 'Year',
      key: 'year',
      render: (_: string, record: Reservation) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.vehicle?.year } </span>
          </div>
        )
      }
    },
    {
      title: 'Exterior Color',
      key: 'exterior_color',
      render: (_: string, record: Reservation) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.vehicle?.exterior_color.name } </span>
          </div>
        )
      }
    },
    {
      title: 'Mileage',
      key: 'mileage',
      render: (_: string, record: Reservation) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.vehicle?.mileage } </span>
          </div>
        )
      }
    },
    {
      title: 'Price',
      key: 'price',
      render: (_: string, record: Reservation) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> ${ record?.vehicle?.fees.vehicle_price } </span>
          </div>
        )
      }
    },
    {
      title: 'Vin Number',
      key: 'vin_number',
      render: (_: string, record: Reservation) => {
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span> { record?.vehicle?.vin_number } </span>
          </div>
        )
      }
    },
    {
      key: 'action',
      width: 50,
      render: (_: string, record: Reservation) => {
        return (
          <TableActionDropdown
            actions={[
              {
                label: 'View',
                action: () => startTransition(() => navigate(`/vehicle?vehicle_id=${record?.vehicle?.vehicle_id}`))
              },
            ]}
          />
        )
      }
    },
  ];

  return (
    <Table 
      dataSource={reservations} 
      columns={columns} 
      size='small'
      bordered
      rowClassName={rowClassName}
    />
  );
}

export default VehicleTable
