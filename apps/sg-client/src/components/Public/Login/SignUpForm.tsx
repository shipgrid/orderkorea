
import { 
  Button,
  Form, 
  Input,
  message,
  Spin
} from 'antd';

import {
  useNavigate
} from 'react-router-dom'

import {
  useDispatch,
} from 'react-redux'

import { 
  useFirebase 
} from 'react-redux-firebase'

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
  const firebase = useFirebase();
  const dispatch = useDispatch();

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
      const firebaseCreateUserResponse = await firebase.createUser({
        email: username,
        password: password
      })
      
      await register({
        first_name,
        last_name,
        username,
        password,
        uid: firebaseCreateUserResponse.user.uid,
      })
      
      await firebase.login({  
        email: username,
        password: password
      })

      const firebaseToken = await firebase.auth().currentUser?.getIdToken()
      dispatch({ type: 'LOGIN', payload: { token: firebaseToken } })
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
      <Spin spinning={isLoading}>
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
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form> 
      </Spin>
    </>
  )
}
  
export default SignUpForm
