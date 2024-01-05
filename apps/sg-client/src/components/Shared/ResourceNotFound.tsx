import { 
  Button, 
  Result 
} from 'antd'

import { 
  useNavigate
} from 'react-router-dom'

const ResourceNotFound: React.FC = () => {
  const navigate = useNavigate()

  const handleBackHome = () => {
    navigate('/') 
  }

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the resource you are looking for does not exist."
      extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
    />
  )
}

export default ResourceNotFound
