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
  Divider,
  StatHelpText,
  StatArrow,
  StatGroup,
  Radio,
  HStack
} from '@chakra-ui/react';

interface InventoryRowProps {
  id: number,
  imageUrl: string,
  handleClick: (id:number) => void
}

const InventoryRow: React.FC<InventoryRowProps> = ({
  id,
  imageUrl,
  handleClick
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
        <Radio size='lg' colorScheme='blue' />
      </HStack>
  </Card>
  );
}

export default InventoryRow