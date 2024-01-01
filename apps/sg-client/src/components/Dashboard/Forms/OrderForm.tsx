import {
  Button,
  Form,
  Input,
  Upload,
  Select,
  Divider,
  Drawer,
  Space,
  Table,
  message
} from 'antd';

import type { 
  UploadProps,
  SelectProps, 
} from 'antd';

import {
  setOrder
} from '../../../redux/reducers/order'

import {
  Vehicle
} from '../../../services/api'

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
  useNavigate 
} from 'react-router-dom'

import {
  useDispatch,
} from 'react-redux'

import { 
  useSelector 
} from 'react-redux'

import {
  useGetVehiclesQuery,
  useCreateOrderMutation,
  CreateOrderParams,
  CreateAddressBody
} from '../../../services/api'

const VehicleForm = ({

}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector((state: any) => state.order)
  const [open, setOpen] = useState(false);
  const [selectedVehicles, setSelectedVehicles] = useState<Vehicle[]>([]);

  const [ createOrder, { isLoading } ] = useCreateOrderMutation();

  const { 
    data:vehicles, 
    error, 
    isLoading:getVehiclesLoading 
  } = useGetVehiclesQuery({});

  const [
    upload
  ] = useUploadMutation();

  const handleAddToOrder = (vehicles: Vehicle[]) => {

    dispatch(setOrder({ 
      ...order,
      vehicles: [
        ...vehicles
      ]
    }));

    dispatch({
      type: 'SET_ORDER',
      payload: {
        vehicles: [
          ...vehicles     
        ]
      }
    })
  }

  useEffect(() => {
  }, [order.vehicles.length])

  const columns = [
    {
      title: 'Vehicle ID',
      key: 'vehicle_id',
      dataIndex: 'vehicle_id',
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'make',
    },
    {
      title: 'model',
      key: 'model',
      dataIndex: 'model',
    },
    {
      title: 'Vin Number',
      key: 'vin_number',
      dataIndex: 'vin_number',
    },
  ];
  console.log(order)
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
      // console.log(consignee)
      if(properties.includes('consignee')) {
        const newProperty = properties.replace('consignee_', '')
        consignee[newProperty] = values[properties];
      }

      if(properties.includes('shipper')) {
        const newProperty = properties.replace('shipper_', '')
        shipper[newProperty] = values[properties];
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
      documents: values.documents.fileList.map((file: any) => {
        return {
          name: file.originFileObj.name,
          file_url: file.response
        }
      }),
      vehicles: order.vehicles.map((item:Vehicle) => {
       
        return {
          vehicle_id: item.vehicle_id,
          make: item.make,
          model: item.model,
          year: item.year,
          description: item.description,
          exterior_color: item.exterior_color,
          transmission_type: item.transmission_type,
          mileage: item.mileage,
          price: item.price,
          fuel_type: item.fuel_type,
          images: item.images
        }
      })
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

  const handleChange = (value: string | string[]) => {
    console.log(`Selected: ${value}`);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);

    handleAddToOrder(selectedVehicles)
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Vehicle[]) => {
      setSelectedVehicles(selectedRows)
    }
  };

  const options: SelectProps['options'] = [];

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
          {/* <Select
            mode="multiple"
            placeholder="Please select"
            defaultValue={[`${order.vehicles.map((item:Vehicle) => `(${item.year} ${item.make} ${item.model})`)}`]}
            onChange={handleChange}
            style={{ width: '100%' }}
            options={options}
            disabled={true}
          /> */}
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
          dataSource={vehicles} 
          loading={getVehiclesLoading} 
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

