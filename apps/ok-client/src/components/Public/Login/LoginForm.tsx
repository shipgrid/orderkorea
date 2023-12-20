
import { 
  Button,
  Checkbox, 
  Form, 
  Input 
} from 'antd';

import agent from '../../../api/agent'

import {
  connect,
} from 'react-redux'

import { 
  Dispatch 
} from 'redux';

import {
  useNavigate
} from 'react-router-dom'

interface LoginAction {
  type: string;
  payload: any; // Define the payload type here
}

const mapStateToProps = (state: LoginAction) => ({ store: state });

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) => ({
  login: (loginData: any) => dispatch({ type: 'LOGIN', payload: loginData }),
});

export { mapStateToProps, mapDispatchToProps };

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

interface LoginFormProps {
  login: (loginData: any) => void;
}

const LoginForm = ({
  login
}: LoginFormProps) => {

  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    
    const {
      username,
      password,
    } = values;

    try {
      const response = await agent.account.login({
        username,
        password
      })

      login(response.data)
      navigate('/')

    } catch(e) {
      console.log(e)
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
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
      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form> 
  )
}
  
export default (connect(mapStateToProps, mapDispatchToProps)(LoginForm))
