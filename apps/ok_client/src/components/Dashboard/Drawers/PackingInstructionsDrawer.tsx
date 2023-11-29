import React, { 
  useState 
} from 'react';

import { 
  Button, 
  Col, 
  Drawer, 
  Form, Input, 
  Row, 
  Space, 
  Alert, 
  Checkbox 
} from 'antd';

import type { 
  CheckboxChangeEvent 
} from 'antd/es/checkbox';

import { 
  FiPlus 
} from 'react-icons/fi';

import { 
  RiSave3Line 
} from 'react-icons/ri';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer} icon={<FiPlus />}>
        Packing Instructions (Optional)
      </Button>
      <Drawer
        title="Review Your Packing Instructions"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} icon={<RiSave3Line />}>
              Save
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="giftWrap"
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Checkbox onChange={onChange}>Gift Wrapping</Checkbox>
              </Form.Item>
              <Form.Item
                name="url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Checkbox onChange={onChange}> Extra Padding </Checkbox>
              </Form.Item>
              <Form.Item
                name="url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Checkbox onChange={onChange}> Add Bubble Wrap </Checkbox>
              </Form.Item>
              <Form.Item
                name="url"
                rules={[{ required: true, message: 'Please enter url' }]}
              >
                <Checkbox onChange={onChange}> Inclusions Only </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Alert style={{ marginBottom: 20}} message="If you have selected for inclusions only, please use the below area to describe your specific instructions." type="info" showIcon />
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Extra Details"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              > 
                <Input.TextArea rows={4} placeholder="Provide extra instructions here..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default App;