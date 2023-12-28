import {
  Button,
  Form,
  Input,
  Upload,
  Select,
  Divider,
} from 'antd';

import type { 
  UploadProps,
  SelectProps, 
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

import {
  useUploadMutation
} from '../../../services/api'

import {
  useCreateVehicleMutation
} from '../../../services/api'

import {
  startTransition
} from 'react';

import { 
  useNavigate 
} from 'react-router-dom'

const VehicleForm = ({

}) => {

  const navigate = useNavigate();

  const [ 
    createVehicle, { 
      isLoading: createVehicleLoading 
    }
  ] = useCreateVehicleMutation();

  const [
    upload
  ] = useUploadMutation();

  const onFinish = async (values: any) => {

    const requestBody = {
      make: values.make,
      model: values.model,
      year: values.year,
      mileage: parseFloat(values.mileage),
      description: values.description,
      exterior_color: values.exterior_color,
      transmission_type: values.transmission_type,
      price: values.price,
      fuel_type: values.fuel_type,
      images: values.vehicle_images.fileList.map((file: any) => {
        return {
          image_url: file.response
        }
      })
    }

    await createVehicle(requestBody)

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
          <Select
            mode="multiple"
            placeholder="Please select"
            defaultValue={['a10', 'c12']}
            onChange={handleChange}
            style={{ width: '100%' }}
            options={options}
            disabled={true}
          />
          <Button style={{marginTop: 2}} onClick={() => startTransition(() => navigate(`/inventory`))}> Find Vehicles </Button>
        </Form.Item>
        <div style={{ fontSize: 20, fontWeight: 'bold' }}> Documents </div>
        <Divider/>
        <Form.Item label="Upload Documents" name='vehicle_images'>
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
          <Button style={{ width: '100%'}} icon={<RiSave3Line />} type="primary" htmlType="submit" loading={createVehicleLoading}> Save </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default VehicleForm
