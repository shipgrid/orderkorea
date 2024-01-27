import { 
  Result 
} from 'antd'

const NoMatches: React.FC = () => {
  return (
    <Result
      status="warning"
      title="We didn't find any matches"
      subTitle="Try another search term to find what you're looking for."
    />
  )
}

export default NoMatches
