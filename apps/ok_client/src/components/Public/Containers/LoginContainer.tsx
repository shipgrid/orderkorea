import {
  Stack,
} from '@chakra-ui/react';

import LoginForm from '../Login/LoginForm'
import LoginBannerImage from '../Login/LoginBannerImage';

const Login = () => {
  return (
    <Stack direction={{ base: 'column', md: 'row' }}>
      <LoginForm/>
      <LoginBannerImage/>
    </Stack>
  );
}

export default Login
