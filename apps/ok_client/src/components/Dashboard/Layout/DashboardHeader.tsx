import {
  Box,
} from '@chakra-ui/react';

import { 
  PageHeader,
} from '@ant-design/pro-layout'

import {
  Flex,
} from 'antd'


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
    <Flex>
      <PageHeader
        onBack={() => null}
        title={title}
        subTitle={description}
        extra={[
          action
        ]}
        style={{ flex: 1 }}
      />
    </Flex>
  );
}

export default DashboardHeader
