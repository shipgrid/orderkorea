import {
  Flex,
  Image,
} from '@chakra-ui/react';

const LoginBannerImage = () => {
  return (
    <Flex flex={1}>
      <Image
        alt={'Login Image'}
        objectFit={'cover'}
        src={
          'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
        }
      />
    </Flex>
  );
}

export default LoginBannerImage
