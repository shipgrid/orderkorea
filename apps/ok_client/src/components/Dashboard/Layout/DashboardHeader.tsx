import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
} from '@chakra-ui/react';

interface DashboardHeaderProps {
  title: string
  description: string
}

const DashboardHeader = ({
  title,
  description
}:DashboardHeaderProps) => {
  return (
    <Flex justifyContent={'space-between'}>
      <Box>
        <Heading size='md'>
          { title } 
        </Heading>
        <Text py={1} color='gray'> { description } </Text>
      </Box>
    </Flex>
  );
}

export default DashboardHeader
