import {
  Center,
  Stack,
  CardBody,
  Card,
  Image,
  Stat,
  StatLabel,
  Divider,
  StatHelpText,
  StatGroup,
  Radio,
  HStack
} from '@chakra-ui/react';

interface InventoryRowProps {
  id: number,
  imageUrl: string,
  name: string,
  sku: string,
  dimensions: string,
  weight: string,
  quantity: number,
  price: string,
  handleClick: (id:number) => void
}

const InventoryRow: React.FC<InventoryRowProps> = ({
  id,
  name,
  sku,
  imageUrl,
  handleClick,
  dimensions,
  weight,
  quantity,
  price
}:InventoryRowProps) => {

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow='hidden'
      variant='outline'
      maxW={{ base: '600px' }}
      minW={{ base: '600px' }}
      onClick={() => handleClick(id)}
      style={{ cursor: 'pointer' }}
    >
      <HStack>
        <Center p={3} >
          <Image
            objectFit='cover'
            maxW={{ base: '65px' }}
            maxH={{ base: '65px' }}
            minW={{ base: '65px' }}
            minH={{ base: '65px' }}

            src={imageUrl}
            alt='PlayStation 5'
            borderRadius="md" 
          />
        </Center>
        <Stack>
          <CardBody>
            <Center>
              <StatGroup>
                <Stat px={5} minW={230} maxW={230}>
                  <StatLabel> Product </StatLabel>
                  <StatHelpText>
                    {name} ({sku})
                  </StatHelpText>
                </Stat>
                <Stat px={5} minW={125}>
                  <StatLabel>Quantity</StatLabel>
                  <StatHelpText>
                    {quantity} x {price}
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </Center>
            <Divider />
            <StatGroup>
              <Stat px={5} py={2} minW={230}>
                <StatLabel>Dimensions</StatLabel>
                <StatHelpText>
                  {dimensions}
                </StatHelpText>
              </Stat>
              <Stat px={5} py={2} minW={125}>
                <StatLabel>Weight</StatLabel>
                <StatHelpText>
                  {weight}
                </StatHelpText>
              </Stat>
            </StatGroup>
          </CardBody>
        </Stack>
        <Radio size='lg' colorScheme='blue' />
      </HStack>
    </Card>
  );
}

export default InventoryRow