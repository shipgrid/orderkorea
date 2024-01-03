import {
  Button,
  Form,
  Input,
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

import {
  Order
} from '../../../services/api'

import { 
  useEffect
} from 'react'

interface OrderDetailFormProps {
  order: Order | undefined;
  isLoading?: boolean;
  updateOrder: (values: any) => void;
}

const OrderDetailForm: React.FC<OrderDetailFormProps> = ({
  order,
  updateOrder,
  isLoading
}) => {

  const onFinish = async (values: any) => {
    await updateOrder({
      ...values
    })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
  }, [order])

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      style={{ flex: 1, padding: 10, borderRadius: 10,  }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={order}
    >
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
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button style={{ width: '100%'}} icon={<RiSave3Line />} type="primary" htmlType="submit" loading={isLoading}> Save </Button>
      </Form.Item>
    </Form>
  );
}

export default OrderDetailForm
