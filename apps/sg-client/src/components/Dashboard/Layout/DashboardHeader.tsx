import { 
  ReactNode,
  startTransition
} from 'react'

import { 
  useNavigate, 
  useLocation 
} from 'react-router-dom'

import { 
  PageHeader
} from '@ant-design/pro-layout'

import { 
  Flex
} from 'antd'

interface DashboardHeaderProps {
  title: string
  description: string
  action?: ReactNode
}

const DashboardHeader = ({
  title,
  description,
  action
}: DashboardHeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleBack = () => {
    if(location.pathname === '/') {
      return
    } 

    startTransition(() => navigate(-1))
  }

  return (
    <Flex>
      <PageHeader
        onBack={handleBack} 
        title={title}
        subTitle={description}
        extra={[
          action
        ]}
        style={{ flex: 1 }}
      />
    </Flex>
  )
}

export default DashboardHeader
