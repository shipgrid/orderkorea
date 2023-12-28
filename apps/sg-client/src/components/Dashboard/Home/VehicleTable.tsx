import {
  Table,
  Button,
  Progress,
  Image,
} from 'antd'

import '../../../assets/index.css'

import {
  startTransition
} from 'react';

import { 
  useNavigate 
} from 'react-router-dom'

import {
  useGetVehiclesQuery
} from '../../../services/api';

import {
  Vehicle,
  VehicleImage
} from '../../../services/api'

import TableActionDropdown from '../../Shared/TableActionDropdown';

const OrderTable = () => {

  const navigate = useNavigate();

  const { 
    data:vehicles, 
    error, 
    isLoading 
  } = useGetVehiclesQuery({});

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
      render: (key: string, record: Vehicle) => {
        return (
          <TableActionDropdown
            actions={[
              {
                label: 'View',
                action: () => startTransition(() => navigate(`/vehicle?vehicle_id=${record.vehicle_id}`))
              },
              {
                label: 'Add to Order',
                action: () => startTransition(() => navigate(`/vehicle?vehicle_id=${record.vehicle_id}`))
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
      loading={isLoading} 
      columns={columns} 
      rowClassName={rowClassName}
    />
  );
}

export default OrderTable
