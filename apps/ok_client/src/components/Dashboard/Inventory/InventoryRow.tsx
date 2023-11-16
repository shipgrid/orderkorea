import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  CardBody,
  Heading,
  CardFooter,
  useColorModeValue,
  Avatar,
  Card,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup
} from '@chakra-ui/react';

const InventoryRow = () => {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      maxW={{ base: '900px' }}
      onClick={() => {console.log('being pressed')}}
    >
    <Center p={3} >
      <Image
        objectFit='cover'
        maxW={{ base: '55px' }}
        maxH={{ base: '55px' }}
        minW={{ base: '55px' }}
        minH={{ base: '55px' }}

        src='https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww'
        alt='PlayStation 5'
        borderRadius="md" 
      />
    </Center>
    <Stack>
      <CardBody>
        <Center>
          <StatGroup>
            <Stat px={5} minW={125}>
              <StatLabel> Product </StatLabel>
              <StatHelpText>
                PlayStation 5
              </StatHelpText>
            </Stat>
            <Stat px={5} minW={125}>
              <StatLabel> SKU </StatLabel>
              <StatHelpText>
                PS-1310-20
              </StatHelpText>
            </Stat>
            <Stat px={5} minW={125}>
              <StatLabel>Location</StatLabel>
              <StatHelpText>
                34-010-A
              </StatHelpText>
            </Stat>
            <Stat px={5} minW={125}>
              <StatLabel>Arrived On</StatLabel>
              <StatHelpText>
                11/02/23
              </StatHelpText>
            </Stat>
            <Stat px={5} minW={125}>
              <StatLabel>Quantity</StatLabel>
              <StatHelpText>
                20
              </StatHelpText>
            </Stat>
            <Stat px={5} minW={125}>
              <StatLabel>Total Cost</StatLabel>
              <StatHelpText>
                USD 69.99
              </StatHelpText>
            </Stat>
          </StatGroup>
        </Center>
      </CardBody>
    </Stack>
  </Card>
  );
}

export default InventoryRow