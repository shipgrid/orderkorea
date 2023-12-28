import React from 'react';
import { Button, Result } from 'antd';

const ResourceNotFound: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the resource you are looking for does not exist."
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default ResourceNotFound;