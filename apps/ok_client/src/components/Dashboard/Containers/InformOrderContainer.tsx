import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../Layout/Grid';

const { TextArea } = Input;

const InformOrderContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Inform Order Overview'}
          description={'Start your inform order and and tell us what will be arriving at our warehouse'}
        />
        <Divider my={5}/>
        <Grid
          title="Inform Order"
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          content={
            <div style={{ display: 'flex', width: 800 }}>
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
            </div>
            
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default InformOrderContainer
