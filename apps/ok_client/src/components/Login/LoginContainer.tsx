import {
  Stack,
} from '@chakra-ui/react';

import LoginForm from './LoginForm'
import LoginBannerImage from './LoginBannerImage';

const Login = () => {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <LoginForm/>
      <LoginBannerImage/>
    </Stack>
  );
}

export default Login
