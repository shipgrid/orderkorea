import {
  Button,
  Form,
  Input,
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

const VehicleForm = ({

}) => {

  const onFinish = async (values: any) => {

  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        <Form.Item label="Year" name='year'>
          <Input/>
        </Form.Item>
        <Form.Item label="Exterior Color" name='exterior_color'>
          <Input/>
        </Form.Item>
        <Form.Item label="Mileage" name='mileage'>
          <Input/>
        </Form.Item>
        <Form.Item label="Price" name='price'>
          <Input/>
        </Form.Item>
        <Form.Item label="Transmission Type" name='transmission_type'>
          <Input/>
        </Form.Item>
        <Form.Item label="Fuel Type" name='fuel_type'>
          <Input/>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Button style={{ width: '100%'}} icon={<RiSave3Line />} type="primary" htmlType="submit"> Search </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default VehicleForm
