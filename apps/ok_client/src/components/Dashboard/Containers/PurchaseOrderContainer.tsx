import {
  Stack,
  Divider
} from '@chakra-ui/react';

import { 
  FiPlus 
} from "react-icons/fi";

import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';

import {
  useNavigate
} from 'react-router-dom'

import { 
  RiSave3Line 
} from "react-icons/ri";


import DashboardHeader from '../Layout/DashboardHeader';
import InventoryTable from '../Inventory/InventoryTable';
import DashboardContent from '../Layout/DashboardContent';

type SizeType = Parameters<typeof Form>[0]['size'];

const InventoryContainer = () => {

  const navigate = useNavigate()
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Purchase Order Overview'}
          description={'Start your purchase order and we will take care of the rest'}
          action={<Button icon={<RiSave3Line />}> Save </Button>}
        />
        <Divider my={5}/>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ backgroundColor: 'white', padding: 10, borderRadius: 10 }}
        >
          <Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Input">
            <Input />
          </Form.Item>
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="TreeSelect">
            <TreeSelect
              treeData={[
                { title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] },
              ]}
            />
          </Form.Item>
          <Form.Item label="Cascader">
            <Cascader
              options={[
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [{ value: 'hangzhou', label: 'Hangzhou' }],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
          <Form.Item label="InputNumber">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Switch" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Button">
            <Button>Button</Button>
          </Form.Item>
        </Form>
        {/* <InventoryTable /> */}
      </DashboardContent>
    </Stack>
  );
}

export default InventoryContainer
