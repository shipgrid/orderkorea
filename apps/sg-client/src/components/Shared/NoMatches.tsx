import { 
  Result 
} from 'antd'

const NoMatches: React.FC = () => {
  return (
    <Result
      status="404"
      title="We didn't find any exact matches"
      subTitle="Try another search term to find what you're looking for."
    />
  )
}

export default NoMatches
