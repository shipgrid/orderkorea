import { 
  Button,
  Form, 
  Input,
  Divider,
  message,
  Spin
} from 'antd';

import {
  useDispatch,
} from 'react-redux'

import {
  Link
} from 'react-router-dom'

import { 
  FaGoogle 
} from "react-icons/fa";

import { 
  useFirebase 
} from 'react-redux-firebase'

import {
  useRegisterMutation,
  useFirebaseLoginMutation
} from '../../../services/api'

import {
  login
} from '../../../redux/reducers/session'


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = ({}) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [register, { 
      isLoading 
    }
  ] = useRegisterMutation()

  const [firebaseLogin, {
      isLoading: firebaseLoginLoading 
    }
  ] = useFirebaseLoginMutation()

  const signInWithGoogle = async () => {
    const response: any = await firebase.login({ provider: 'google', type: 'popup' })

    if(response?.additionalUserInfo?.isNewUser) {

      await register({
        first_name: response?.additionalUserInfo?.profile?.given_name,
        username: response?.user?.email,
        password: 'secret',
        uid: response?.user?.uid,
      })
    }

    const firebaseToken = await firebase.auth().currentUser?.getIdToken()

    if(!firebaseToken) {
      return;
    }

    const loginResponse: any = await firebaseLogin({
      firebase_token: firebaseToken
    })
    console.log(loginResponse)

    dispatch(login({ 
      token: loginResponse.data.token, 
      fbToken: firebaseToken,
      username: loginResponse.data.username,
      isCustomer: loginResponse.data.is_customer,
      isStaff: loginResponse.data.is_staff
    }));
  };

  const onFinish = async (values: any) => {    
    const {
      username,
      password,
    } = values;

    try {
      
      await firebase.login({  
        email: username,
        password: password
      })

      const firebaseToken = await firebase.auth().currentUser?.getIdToken()

      if(!firebaseToken) {
        return;
      }
  
      const loginResponse = await firebaseLogin({
        firebase_token: firebaseToken
      })
      
      dispatch(login({ 
        token: loginResponse.data.token, 
        fbToken: firebaseToken,
        username: loginResponse.data.username,
        isCustomer: loginResponse.data.is_customer,
        isStaff: loginResponse.data.is_staff
      }));
      
    } catch(e:any) {
      message.error({ content: e.message, duration: 2 })    
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Spin spinning={isLoading}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="username"
            rules={[{ required: true, message: 'Please input your email' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Submit
            </Button>
          </Form.Item>
        </Form> 
        <Divider/>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Button icon={<FaGoogle/>} onClick={signInWithGoogle} loading={firebaseLoginLoading}> Sign in with Google </Button>
          <p color="gray.500" style={{ marginTop: 10 }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </Spin>
    </div>
  )
}
  
export default LoginForm
