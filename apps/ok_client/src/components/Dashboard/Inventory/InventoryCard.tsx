import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  Avatar,
  Image
} from '@chakra-ui/react';

const Pricing = () => {
  return (
    <Center py={6}>
      <Box
        maxW={'270px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={3}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/04/06/17/9/f7c15ab1-426a-419a-a8ab-ee572dc431aa.jpg'
            }
          />
        </Stack>
        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={3} py={6}>
          <Text fontWeight={'bold'} fontSize={'xs'}> PlayStation 5 DualSense Wireless Controller </Text>
          <Text fontSize={'xs'}> Stock: 22 </Text>
          <Text fontSize={'xs'}> Length: 5 </Text>
          <Text fontSize={'xs'}> Width: 5 </Text>
          <Text fontSize={'xs'}> Height: 5 </Text>
          <Text fontSize={'xs'}> Unit Price: $7.99 </Text>
          <Button
            mt={10}
            w={'full'}
            bg={'green.400'}
            color={'white'}
            rounded={'xl'}
            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
            _hover={{
              bg: 'green.500',
            }}
            _focus={{
              bg: 'green.500',
            }}
          >
            Add to Shipment
          </Button>
        </Box>
      </Box>
    </Center>
  );
}

export default Pricing