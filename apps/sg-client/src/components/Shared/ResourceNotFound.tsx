import { 
  Result 
} from 'antd'

const ResourceNotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the resource you are looking for does not exist."
    />
  )
}

export default ResourceNotFound
