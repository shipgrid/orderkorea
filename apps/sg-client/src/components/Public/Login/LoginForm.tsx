import { 
  Button,
  Form, 
  Input,
  Divider,
  message,
  Spin,
  Image
} from 'antd';

import {
  useDispatch,
} from 'react-redux'

import {
  Link
} from 'react-router-dom'

import {
  login
} from '../../../redux/reducers/session'

import {
  useLoginMutation
} from '../../../services/api'

import Logo from '../../../assets/images/logo-no-bg.png';


type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = ({}) => {
  const dispatch = useDispatch();

  const [accountLogin, {
    isLoading: loginLoading
  }] = useLoginMutation()

  const onFinish = async (values: any) => {    
    const {
      username,
      password,
    } = values;

    try {

      const response: any = await accountLogin({
        username,
        password
      })

      if(response.error) {
        message.error({ content: response.error.message, duration: 2 })    
        return; 
      }

      dispatch(login({ 
        token: response.data.token, 
        username: response.data.username,
        isBroker: response.data.is_broker,
        isStaff: response.data.is_staff
      }));
      
    } catch(e:any) {
      message.error({ content: e.message, duration: 2 })    
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column'}}>
      <Image src={Logo} preview={false} style={{ width: 150, cursor:'pointer', marginBottom: 35 }}/>
      <Spin spinning={loginLoading}>
        <div style={{ padding: 20 }}>
          <h2 style={{ color: 'black', marginBottom: 20 }}>
            Sign In
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            style={{ width: 320, maxWidth: 600 }}
            layout='vertical'
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
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form.Item>
          </Form> 
          <Divider/>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <p style={{ marginTop: 10, color: 'black' }}>
            <a
              href="https://forms.gle/3q6pTTMdCXxcQK4W6"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the <b>Broker Network</b> <Link to='https://forms.gle/3q6pTTMdCXxcQK4W6'> send in an application</Link>
            </a>
              {/* Don't have an account? <Link to="/signup">Sign up</Link> */}
            </p>
          </div>
        </div>
      </Spin>
    </div>
  )
}
  
export default LoginForm
