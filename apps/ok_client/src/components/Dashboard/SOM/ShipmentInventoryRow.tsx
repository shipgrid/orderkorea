import {
  Center,
  Stack,
  CardBody,
  Card,
  Image,
  Stat,
  StatLabel,
  StatHelpText,
  StatGroup,
  Divider,
  HStack,
  Radio
} from '@chakra-ui/react';

interface ShipmentInventoryRowProps {
  id: number,
}

const ShipmentInventoryRow = ({
  id,
}:ShipmentInventoryRowProps) => {

  return (
  <Card
    direction={{ base: 'column', sm: 'row' }}
    overflow='hidden'
    variant='outline'
    maxW={{ base: '600px' }}
    minW={{ base: '600px' }}
    style={{ cursor: 'pointer' }}
    m={1}
  >
    <Center p={3} >
      <Image
        objectFit='cover'
        maxW={{ base: '65px' }}
        maxH={{ base: '65px' }}
        minW={{ base: '65px' }}
        minH={{ base: '65px' }}

        src='https://images.unsplash.com/photo-1635048424329-a9bfb146d7aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHM1fGVufDB8fDB8fHww'
        alt='PlayStation 5'
        borderRadius="md" 
      />
    </Center>
    <HStack>
      <Stack>
        <CardBody>
          <Center>
            <StatGroup>
              <Stat px={5} minW={125}>
                <StatLabel> Product </StatLabel>
                <StatHelpText>
                  PlayStation 5 (PS-1310-20)
                </StatHelpText>
              </Stat>
              <Stat px={5} minW={125}>
                <StatLabel>Quantity</StatLabel>
                <StatHelpText>
                  20 x USD 12.99
                </StatHelpText>
              </Stat>
            </StatGroup>
          </Center>
          <Divider />
          <StatGroup>
            <Stat px={5} py={2} minW={125}>
              <StatLabel>Dimensions</StatLabel>
              <StatHelpText>
                5cm x 5cm x 5cm
              </StatHelpText>
            </Stat>
            <Stat px={5} py={2} minW={125}>
              <StatLabel>Weight</StatLabel>
              <StatHelpText>
                0.8kg
              </StatHelpText>
            </Stat>
          </StatGroup>
        </CardBody>
      </Stack>
      <Radio size='lg' colorScheme='blue' isChecked={true}/>
    </HStack>
  </Card>
  );
}

export default ShipmentInventoryRow