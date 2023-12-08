import {
  Button,
  Form,
  Input,
  InputNumber,
  Space,
  Select
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

const ShippingCalculatorForm = () => {

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      style={{ flex: 1, padding: 10, borderRadius: 10,  }}
    >
      <Form.Item label="Dimensions (CM)" style={{ marginBottom: 0 }}>
        <Space.Compact>
          <Form.Item>
            <InputNumber placeholder='Length'/>
          </Form.Item>
          <Form.Item>
            <InputNumber placeholder='Width'/>
          </Form.Item>
          <Form.Item>
            <InputNumber placeholder='Height'/>
          </Form.Item>
        </Space.Compact>
      </Form.Item>
      <Form.Item label="Weight (KG)">
        <InputNumber style={{ width: '100%' }}/>
      </Form.Item>
      <Form.Item label="Country">
        <Select
          defaultValue="USA"
          style={{ width: '100%' }}          
          options={[
            { value: 'USA', label: 'USA' },
            { value: 'Canada', label: 'Canada' },
            { value: 'South Korea', label: 'South Korea' },
          ]}
        />
      </Form.Item>
      <Form.Item label="Postal Code">
        <Input/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button style={{ width: '100%'}} icon={<RiSave3Line />}> Get Rates </Button>
      </Form.Item>
    </Form>
  );
}

export default ShippingCalculatorForm
