import {
  Button,
  Form,
  Input,
  Upload,
  message
} from 'antd';

import type { 
  UploadProps 
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

const { 
  TextArea 
} = Input;

const VehicleForm = ({

}) => {

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
      vin_number: values.vin_number,
      transmission_type: values.transmission_type,
      price: parseFloat(values.price),
      fuel_type: values.fuel_type,
      images: values.vehicle_images.fileList.map((file: any) => {
        return {
          image_url: file.response.downloadUrl
        }
      })
    }

    const createVehicleResponse:any = await createVehicle(requestBody)

    if(createVehicleResponse.error) {
      message.error({ content: createVehicleResponse.error.message, duration: 2 })
      return;
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const props: UploadProps = {
    accept: "image/jpeg, image/png, image/webp",
    listType:"picture-card",
    name: 'file',
    multiple: true,
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

  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 5 }}
        style={{ flex: 1, padding: 10, borderRadius: 10,  }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Upload Images" name='vehicle_images'>
          <Upload
            { ...props }
          >
            <div> Click to upload </div>
          </Upload>
        </Form.Item>
        <Form.Item label="Make" name='make'>
          <Input/>
        </Form.Item>
        <Form.Item label="Model" name='model'>
          <Input/>
        </Form.Item>
        <Form.Item label="Year" name='year'>
          <Input/>
        </Form.Item>
        <Form.Item label="Exterior Color" name='exterior_color'>
          <Input/>
        </Form.Item>
        <Form.Item label="Interior Color" name='interior_color'>
          <Input/>
        </Form.Item>
        <Form.Item label="Vin Number" name='vin_number'>
          <Input/>
        </Form.Item>
        <Form.Item label="Transmission Type" name='transmission_type'>
          <Input/>
        </Form.Item>
        <Form.Item label="Mileage" name='mileage'>
          <Input/>
        </Form.Item>
        <Form.Item label="Price" name='price'>
          <Input/>
        </Form.Item>
        <Form.Item label="Fuel Type" name='fuel_type'>
          <Input/>
        </Form.Item>
        <Form.Item label="Description" name='description'>
          <TextArea rows={3} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button style={{ width: '100%'}} icon={<RiSave3Line />} type="primary" htmlType="submit" loading={createVehicleLoading}> Save </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default VehicleForm
