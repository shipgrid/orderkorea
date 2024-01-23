import {
  Button,
  Form,
  Input,
  Upload,
  Divider,
  Drawer,
  Space,
  Table,
} from 'antd';

import type { 
  UploadProps,
} from 'antd';

import {
  setOrder
} from '../../../redux/reducers/order'

import { 
  RiSave3Line 
} from "react-icons/ri";

import {
  useUploadMutation
} from '../../../services/api'

import {
  useEffect,
  useState
} from 'react';

import {
  useDispatch,
} from 'react-redux'

import { 
  useSelector 
} from 'react-redux'

import {
  useGetReservationsQuery,
  useCreateOrderMutation,
  CreateOrderParams,
  CreateAddressBody,
  Reservation
} from '../../../services/api'

const VehicleForm = ({

}) => {

  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order)
  const [open, setOpen] = useState(false);
  const [selectedReservations, setSelectedReservations] = useState<Reservation[]>([]);

  const [ createOrder, { isLoading } ] = useCreateOrderMutation();

  const {
    data: reservedVehicles,
    isLoading: getReservationsLoading
  } = useGetReservationsQuery({});

  const [
    upload
  ] = useUploadMutation();

  const handleAddToOrder = (reservations: Reservation[]) => {

    dispatch(setOrder({ 
      ...order,
      reservations: [
        ...reservations
      ]
    }));

    dispatch({
      type: 'SET_ORDER',
      payload: {
        reservations: [
          ...reservations     
        ]
      }
    })
  }

  useEffect(() => {
  }, [order.reservations.length])

  const columns = [
    {
      title: 'Reservation ID',
      key: 'reservation_id',
      dataIndex: 'reservation_id',
    },
    {
      title: 'Customer ID',
      key: 'customer_id',
      dataIndex: 'customer_id',
    },
    {
      title: 'Make',
      key: 'vehicle.make',
      render: (_: string, record: any) => {
        return (
          <span> { record.vehicle.year } { record.vehicle.make.name } </span>
        )
      }
    },
    {
      title: 'Model',
      key: 'model',
      render: (_: string, record: any) => {
        return (
          <span> { record.vehicle.model.name } </span>
        )
      }    },
    {
      title: 'Trim',
      key: 'vin_number',
      render: (_: string, record: any) => {
        return (
          <span> { record.vehicle.trim.name } </span>
        )
      }    },
  ];

  const onFinish = async (values: any) => {

    const consignee:CreateAddressBody = {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state_code: '',
      country_code: '',
      postal_code: '',
      email: '',
      phone: ''
    }

    const shipper:CreateAddressBody = {
      name: '',
      line1: '',
      line2: '',
      city: '',
      state_code: '',
      country_code: '',
      postal_code: '',
      email: '',
      phone: ''
    }

    for(const properties in values) {

      if(properties.includes('consignee')) {
        const newProperty = properties.replace('consignee_', '')
        consignee[newProperty as keyof CreateAddressBody] = values[properties];
      }

      if(properties.includes('shipper')) {
        const newProperty = properties.replace('shipper_', '')
        shipper[newProperty as keyof CreateAddressBody] = values[properties];
      }
    }

    const orderDetails: CreateOrderParams = {
      email: values.email,
      shipment_type: values.shipment_type,
      port_of_loading: values.port_of_loading,
      container_number: values.container_number,
      port_of_arrival: values.port_of_arrival,
      loaded_on: values.loaded_on,
      thirdParties: [
        {
          address: consignee, // Cast the consignee address as CreateAddressBody
          type: 'consignee'
        },
        {
          address: shipper, // Cast the shipper address as CreateAddressBody
          type: 'shipper'
        }
      ],
      documents: values.documents?.fileList.map((file: any) => {
        return {
          name: file.originFileObj.name,
          file_url: file.response.file_url
        }
      }),
      reservations: order.reservations.map((item:any) => ({
        reservation_id: item.reservation_id,
        vehicle_id: item.vehicle.vehicle_id,
      }))
    };

    await createOrder(orderDetails);
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const props: UploadProps = {
    accept: "image/jpeg, image/png",
    listType:"picture-card",
    name: 'file',
    multiple: false,
    customRequest: async (options) => { 
      
      const { 
        file, 
        onSuccess, 
        onError 
      } = options

      const fileName = (file as File).name;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', fileName);

      const response = await upload({
        file: formData
      })
      
      if ('data' in response) {
        
        if (onSuccess) {
          onSuccess(response.data);
        }
      } else {
        if (onError) {
          onError(new Error('Something went wrong!'));
        }
      }
    },
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);

    handleAddToOrder(selectedReservations)
  };

  const rowSelection = {
    onChange: (_: React.Key[], selectedRows: Reservation[]) => {
      setSelectedReservations(selectedRows)
    }
  };

  if(!reservedVehicles) return null;

  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        style={{ flex: 1, padding: 10, borderRadius: 10,  }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Order Details </div>
        <Divider/>
        <Form.Item label="Customer Email" name='email'>
          <Input/>
        </Form.Item>
        <Form.Item label="Shipment Type" name='shipment_type'>
          <Input/>
        </Form.Item>
        <Form.Item label="Container Number" name='container_number'>
          <Input/>
        </Form.Item>
        <Form.Item label="City of Loading" name='port_of_loading'>
          <Input/>
        </Form.Item>
        <Form.Item label="Port of Arrival" name='port_of_arrival'>
          <Input/>
        </Form.Item>
        <Form.Item label="Loaded On" name='loaded_on'>
          <Input/>
        </Form.Item>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Vehicles </div>
        <Divider/>
        <Form.Item label="Vehicles" name='vehicles'>
          <Button style={{marginTop: 2}} onClick={showDrawer}> Find Vehicles </Button>
          <span> { order.vehicles?.length } Vehicles Selected </span>
        </Form.Item>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Documents </div>
        <Divider/>
        <Form.Item label="Upload Documents" name='documents'>
          <Upload
            { ...props }
          >
            <div> Click to upload </div>
          </Upload>
        </Form.Item>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Shipper </div>
        <Divider/>
        <Form.Item label="Name" name='shipper_name'>
          <Input/>
        </Form.Item>
        <Form.Item label="Line 1" name='shipper_line1'>
          <Input/>
        </Form.Item>
        <Form.Item label="Line 2" name='shipper_line2'>
          <Input placeholder='optional'/>
        </Form.Item>
        <Form.Item label="City" name='shipper_city'>
          <Input/>
        </Form.Item>
        <Form.Item label="Country" name='shipper_country_code'>
          <Input/>
        </Form.Item>
        <Form.Item label="State/Province" name='shipper_state_code'>
          <Input/>
        </Form.Item>
        <Form.Item label="Postal Code" name='shipper_postal_code'>
          <Input/>
        </Form.Item>
        <Form.Item label="Contact Number">
          <Input placeholder='optional'/>
        </Form.Item>
        <Form.Item label="Contact Email">
          <Input placeholder='optional'/>
        </Form.Item>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Consignee </div>
        <Divider/>
        <Form.Item label="Name" name='consignee_name'>
          <Input/>
        </Form.Item>
        <Form.Item label="Line 1" name='consignee_line1'>
          <Input/>
        </Form.Item>
        <Form.Item label="Line 2" name='consignee_line2'>
          <Input placeholder='optional'/>
        </Form.Item>
        <Form.Item label="City" name='consignee_city'>
          <Input/>
        </Form.Item>
        <Form.Item label="Country" name='consignee_country_code'>
          <Input/>
        </Form.Item>
        <Form.Item label="State/Province" name='consignee_state_code'>
          <Input/>
        </Form.Item>
        <Form.Item label="Postal Code" name='consignee_postal_code'>
          <Input/>
        </Form.Item>
        <Form.Item label="Contact Number">
          <Input placeholder='optional'/>
        </Form.Item>
        <Form.Item label="Contact Email">
          <Input placeholder='optional'/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button style={{ width: '100%'}} icon={<RiSave3Line />} type="primary" htmlType="submit" loading={isLoading}> Save </Button>
        </Form.Item>
      </Form>
      <Drawer
        title="Add vehicles to your order"
        placement={'right'}
        width={1000}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <Table 
          dataSource={reservedVehicles.map((item: any, index: number) =>  ({ ...item, key: index}))} 
          loading={getReservationsLoading} 
          columns={columns}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
        />
      </Drawer>
    </>
  );
}

export default VehicleForm

