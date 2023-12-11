import {
  Button,
  Form,
  Input,
  InputNumber,
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

const { TextArea } = Input;

const DeliveryDestinationForm = () => {

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      style={{ flex: 1, padding: 10, borderRadius: 10,  }}
    >
      <Form.Item label="Name">
        <Input/>
      </Form.Item>
      <Form.Item label="Line 1">
        <Input/>
      </Form.Item>
      <Form.Item label="Line 2">
        <Input placeholder='optional'/>
      </Form.Item>
      <Form.Item label="City">
        <Input/>
      </Form.Item>
      <Form.Item label="Country">
        <Input/>
      </Form.Item>
      <Form.Item label="State/Province">
        <Input/>
      </Form.Item>
      <Form.Item label="Postal Code">
        <Input/>
      </Form.Item>
      <Form.Item label="Contact Number">
        <Input placeholder='optional'/>
      </Form.Item>
      <Form.Item label="Comment">
        <TextArea rows={4} placeholder="name, size, color, design, variant, etc" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button style={{ width: '100%'}} icon={<RiSave3Line />}> Save </Button>
      </Form.Item>
    </Form>
  );
}

export default DeliveryDestinationForm
