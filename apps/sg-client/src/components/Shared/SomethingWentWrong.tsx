import React from 'react';
import { Button, Result } from 'antd';

const SomethingWentWrong: React.FC = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
  />
);

export default SomethingWentWrong;