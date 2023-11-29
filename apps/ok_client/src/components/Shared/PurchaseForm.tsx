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

const PurchaseForm = () => {

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      style={{ flex: 1, padding: 10, borderRadius: 10,  }}
    >
      <Form.Item label="Vendor">
        <Input/>
      </Form.Item>
      <Form.Item label="SKU">
        <Input placeholder='Barcode or reference code'/>
      </Form.Item>
      <Form.Item label="Contact">
        <Input placeholder='email or phone number'/>
      </Form.Item>
      <Form.Item label="Product URL">
        <Input placeholder='https://www.coupang.com/vp/products/717'/>
      </Form.Item>
      <Form.Item label="Quantity">
        <InputNumber style={{ width: '100%' }}/>
      </Form.Item>
      <Form.Item label="Unit Price ₩">
        <InputNumber placeholder='KRW (₩)' style={{ width: '100%' }}/>
      </Form.Item>
      <Form.Item label="Product Description">
        <TextArea rows={4} placeholder="name, size, color, design, variant, etc" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button style={{ width: '100%'}} icon={<RiSave3Line />}> Save </Button>
      </Form.Item>
    </Form>
  );
}

export default PurchaseForm
