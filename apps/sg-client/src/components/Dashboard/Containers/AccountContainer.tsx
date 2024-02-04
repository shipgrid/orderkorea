import {
  Stack,
} from '@chakra-ui/react';

import {
  Button,
  Form, 
  Input,
  Tag,
  Spin,
  message
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import { 
  useGetAccountQuery,
  useUpdateAccountMutation,
  useUpdatePasswordMutation
} from '../../../services/api'

import ApiLoader from '../../Shared/ApiLoader';
import ResourceNotFound from '../../Shared/ResourceNotFound';
import '../../../assets/home.css'

const AccountContainer = () => {

  const {
    data,
    isLoading,
    error
  } = useGetAccountQuery({})

  const [
    updatePassword,
    {
      isLoading: updatePasswordLoading
    }
  ] = useUpdatePasswordMutation()

  const [
    updateAcccount,
    {
      isLoading: updateAccountLoading
    }
  ] = useUpdateAccountMutation()

  const onAccountUpdateFinish = async (values: any) => {    

    const {
      first_name, 
      last_name
    } = values; 

    await updateAcccount({
      first_name,
      last_name
    })

    message.success({ content: 'Account updated', duration: 2 })
  };

  const onUpdatePasswordFinish = async (values: any) => {
    
    const {
      current_password,
      new_password,
      updated_password
    } = values;

    if(new_password !== updated_password) {
      message.error({ content: 'Passwords do not match', duration: 2 })
      return;
    }
  
    await updatePassword({
      current_password,
      updated_password
    })  

    message.success({ content: 'Account updated', duration: 2 })
  }


  if(isLoading) {
    return <ApiLoader />
  }

  if(!data || error) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Account'}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div> 
            <Spin spinning={updateAccountLoading}> 
              <div style={{ margin: 20, padding: 20, backgroundColor: 'white' }}>
                <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Account Settings</div>
                <div style={{ margin: '12px 0px'}}>
                  <Tag color="blue">Broker</Tag>
                  <Tag color="green">Staff</Tag>
                </div>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onAccountUpdateFinish}
                  autoComplete="off"
                  style={{ width: 320, maxWidth: 600 }}
                  layout='vertical'
                >
                  <Form.Item
                    initialValue={data.first_name}
                    label="First Name"
                    name="first_name"
                    rules={[{ required: true, message: 'Please input your email' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    initialValue={data.last_name}
                    label="Last Name"
                    name="last_name"
                    rules={[{ required: true, message: 'Please input your email' }]}
                  >
                    <Input />
                  </Form.Item>        
                  <Form.Item
                    initialValue={data.username}
                    label="Email"
                    name="username"
                    rules={[{ required: true, message: 'Please input your email' }]}
                  >
                    <Input disabled/>
                  </Form.Item>
                  <Form.Item wrapperCol={{ span: 24 }}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form> 
              </div>
            </Spin>

            <Spin spinning={updatePasswordLoading}>
              <div style={{ margin: 20, padding: 20, backgroundColor: 'white' }}>
                <div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>Change Password</div>
                <Form
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onUpdatePasswordFinish}
                  autoComplete="off"
                  style={{ width: 320, maxWidth: 600 }}
                  layout='vertical'
                >
                  <Form.Item
                    label="Current Password"
                    name="current_password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="new_password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="updated_password"
                    rules={[{ required: true, message: 'Please input your password' }]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                      Save Changes
                    </Button>
                  </Form.Item>
                </Form> 
              </div>
            </Spin>
          </div>
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default AccountContainer
