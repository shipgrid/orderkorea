import { 
  Button,
  Form, 
  Input,
  Divider,
  Spin,
  Image
} from 'antd';

import {
  useDispatch,
} from 'react-redux'

import {
  login
} from '../../../redux/reducers/session'

import {
  useNavigate
} from 'react-router-dom'

import {
  useLoginMutation
} from '../../../services/api'

import {
  trackFormOpen
} from '../../../lib/analytics'

import config from '../../../config/config'

import Logo from '../../../assets/images/logo-no-bg.png';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const LoginForm = ({}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [accountLogin, {
    isLoading: loginLoading
  }] = useLoginMutation()

  const onFinish = async (values: any) => {    
    const {
      username,
      password,
    } = values;

    const response: any = await accountLogin({
      username,
      password
    })

    dispatch(login({ 
      token: response.data.token, 
      userId: response.data.user_id,
      username: response.data.username,
      isBroker: response.data.is_broker,
      isStaff: response.data.is_staff
    }));

    navigate('/')
  };

  const onJoinBrokerNetworkClick = (_: any) => {
    trackFormOpen('Application');
    window.location.href = config.forms.joinBrokerNetworkLink({});
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
          <div style={{display: 'flex', flexDirection: 'column'}} onClick={onJoinBrokerNetworkClick}>
            <p style={{ marginTop: 10, color: 'black' }}>
              <a
                rel="noopener noreferrer"
              >
                Join the <b>Broker Network</b> send in an application
              </a>
            </p>
          </div>
        </div>
      </Spin>
    </div>
  )
}
  
export default LoginForm
