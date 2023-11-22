import {
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface DashboardHeaderProps {
  title: string
  description: string,
  action?: ReactNode
}

const DashboardHeader = ({
  title,
  description,
  action
}:DashboardHeaderProps) => {
  return (
    <Flex justifyContent={'space-between'}>
      <Box>
        <Heading size='lg'>
          { title } 
        </Heading>
        <Text py={1} color='gray'> { description } </Text>
      </Box>
      <Box>
        { action }
      </Box>
    </Flex>
  );
}

export default DashboardHeader
