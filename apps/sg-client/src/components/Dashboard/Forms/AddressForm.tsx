import {
  Button,
  Form,
  Input,
} from 'antd';

import { 
  RiSave3Line 
} from "react-icons/ri";

import {
  Address
} from '../../../services/api'

import { 
  useEffect
} from 'react'

interface AddressFormProps {
  address: Address | undefined;
  isLoading?: boolean;
  createThirdParty: (values: any) => void;
  updateAddress: (values: any) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  isLoading,
  createThirdParty,
  updateAddress,
}) => {

  const onFinish = async (values: any) => {

    if(!address) {
      await createThirdParty({
        ...values
     })
     return;
    }

    await updateAddress({
      address_id: address.address_id,
      ...values
   })
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
  }, [address])

  return (
    <Form
      layout="horizontal"
      labelCol={{ span: 5 }}
      style={{ flex: 1, padding: 10, borderRadius: 10,  }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={address}
    >
      <Form.Item label="Name" name='name'>
        <Input/>
      </Form.Item>
      <Form.Item label="Line 1" name='line1'>
        <Input/>
      </Form.Item>
      <Form.Item label="Line 2" name='line2'>
        <Input placeholder='optional'/>
      </Form.Item>
      <Form.Item label="City" name='city'>
        <Input/>
      </Form.Item>
      <Form.Item label="Country" name='country_code'>
        <Input/>
      </Form.Item>
      <Form.Item label="State/Province" name='state_code'>
        <Input/>
      </Form.Item>
      <Form.Item label="Postal Code" name='postal_code'>
        <Input/>
      </Form.Item>
      <Form.Item label="Contact Number">
        <Input placeholder='optional'/>
      </Form.Item>
      <Form.Item label="Contact Email">
        <Input placeholder='optional'/>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 5 }}>
        <Button style={{ width: '100%'}} icon={<RiSave3Line />} type="primary" htmlType="submit" loading={isLoading}> Save </Button>
      </Form.Item>
    </Form>
  );
}

export default AddressForm
