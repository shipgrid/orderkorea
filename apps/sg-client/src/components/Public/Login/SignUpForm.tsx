
import { 
  Button,
  Checkbox, 
  Form, 
  Input,
  message
} from 'antd';

import agent from '../../../api/agent'

import {
  connect, useDispatch, useSelector,
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

import { useFirebase } from 'react-redux-firebase'

const mapStateToProps = (state: LoginAction) => ({ store: state });

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) => ({
  login: (loginData: any) => dispatch({ type: 'LOGIN', payload: loginData }),
});

export { mapStateToProps, mapDispatchToProps };

type FieldType = {
  first_name?: string;
  last_name?: string;
  username?: string;
  password?: string;
};

interface LoginFormProps {
  login: (loginData: any) => void;
}

const SignUpForm = ({}) => {

  const navigate = useNavigate()
  const auth = useSelector((state: any) => state.firebase.auth)
  const firebase = useFirebase();

  const onFinish = async (values: any) => {    
    const {
      first_name,
      last_name,
      username,
      password,
    } = values;

    try {      
      await firebase.createUser({
        email: username,
        password: password
      })
      
      await agent.account.register({
        first_name,
        last_name,
        username,
        password,
      })
      
      await firebase.login({  
        email: username,
        password: password
      })

      navigate('/')
      navigate(0)

    } catch(e:any) {
      message.error({ content: e.message, duration: 2 })    
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form> 
    </>
  )
}
  
export default SignUpForm
