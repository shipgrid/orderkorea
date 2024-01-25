import { 
  Result 
} from 'antd';

const SomethingWentWrong = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />
);

export default SomethingWentWrong;