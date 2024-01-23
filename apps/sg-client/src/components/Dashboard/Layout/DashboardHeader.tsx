import { 
  ReactNode,
} from 'react'

import { 
  PageHeader
} from '@ant-design/pro-layout'

import { 
  Affix,
  Typography, 
} from 'antd'
const { Text } = Typography

import '../../../assets/dashboard.css'

interface DashboardHeaderProps {
  title: string
  description?: string
  action?: ReactNode
}

const DashboardHeader = ({
  title,
  description,
  action
}: DashboardHeaderProps) => {

  return (
    <Affix offsetTop={0}>
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white', padding: '28px 32px'  }}>
        <PageHeader
          title={
            <Text className='page-header-title'>
              {title}
            </Text>
          }
          subTitle={description}
          extra={[
            action
          ]}
          style={{ 
            flex: 1,
            margin: 0,
            padding: 0
          }}
        />
      </div>
    </Affix>
  )
}

export default DashboardHeader
