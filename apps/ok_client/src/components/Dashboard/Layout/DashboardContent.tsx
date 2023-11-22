import {
  Stack,
} from '@chakra-ui/react';

import { 
  ReactNode 
} from 'react';

interface DashboardContentProps {
  children: ReactNode;
}

const DashboardContent = ({
  children
}:DashboardContentProps) => {
  return (
    <Stack mx={5} my={2}>
      {children}
    </Stack>
  );
}

export default DashboardContent
