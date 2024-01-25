
import { 
  Button,
  Form, 
  Input,
  message,
  Spin,
  Divider,
} from 'antd';

import {
  useNavigate,
  Link
} from 'react-router-dom'

import {
  useRegisterMutation
} from '../../../services/api'

type FieldType = {
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
};

const SignUpForm = ({}) => {

  const navigate = useNavigate()

  const [
    register, { 
      isLoading 
    }
  ] = useRegisterMutation()

  const onFinish = async (values: any) => {    
    const {
      first_name,
      last_name,
      username,
      password,
    } = values;

    try {      

      await register({
        first_name,
        last_name,
        username,
        password,
      })

      navigate('/')

    } catch(e:any) {
      message.error({ content: e.message, duration: 2 })    
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <h2 style={{ color: 'black', marginBottom: 40 }}>
          Sign Up
        </h2>
        <Form
          name="basic"
          style={{ width: 320, maxWidth: 600 }}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Email"
            name="username"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item >
            <Button type="primary" htmlType="submit" loading={isLoading} style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form> 
        <Divider/>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <p style={{ marginTop: 10, color: 'black' }}>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </Spin>
    </>
  )
}
  
export default SignUpForm
