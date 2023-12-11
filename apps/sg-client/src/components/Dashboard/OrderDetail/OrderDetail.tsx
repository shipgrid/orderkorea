import {
  Table,
  Progress,
  Card,
  Image,
  Descriptions,
  Button,
  Avatar,
  Timeline,
  Divider,
  Collapse
} from 'antd'

import '../../../assets/index.css'

const OrderDetail = () => {

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <div style={{ marginTop: 10 }}>
          <Descriptions column={2} bordered layout='vertical' size="small">
            <Descriptions.Item label="SHIPMENT TYPE">59,728km</Descriptions.Item>
            <Descriptions.Item label="CITY_OF_LOADING">Lagos</Descriptions.Item>
            <Descriptions.Item label="CARGO CONTROL NUMBER">1V291028921</Descriptions.Item>
            <Descriptions.Item label="RELEASE OFFICE">Korean Customs Office</Descriptions.Item>
            <Descriptions.Item label="FIRST PORT OF ARRIVAL">Lagos Port Of Customs</Descriptions.Item>
            <Descriptions.Item label="CREATED">December 25, 2023 5:15 PM PST</Descriptions.Item>
            <Descriptions.Item label="LOADED ON">PCI Freight Express</Descriptions.Item>
            <Descriptions.Item label="LAST EDITED">December 25, 2023 5:15 PM PST</Descriptions.Item>
            <Descriptions.Item label="ESTIMATED DATE OF ARRIVAL">December 25, 2023 5:15 PM PST</Descriptions.Item>
          </Descriptions>
        </div>
        <div style={{ margin: 10 }}>
          <Divider />
          <Collapse size='large' items={[
            {
              key: 1,
              label: 'Shipment History',
              children: <Timeline
              items={[
                {
                  color: 'green',
                  children: 'Create a services site 2015-09-01',
                },
                {
                  color: 'green',
                  children: 'Solve initial network problems 2015-09-01',
                },
                {
                  color: 'green',
                  children: 'Technical testing 2015-09-01',
                },
                {
                  color: 'red',
                  children: 'Network problems being solved 2015-09-01',
                },
              ]}
            />
            }
          ]} defaultActiveKey={['1']} onChange={onChange} />
          
        </div>
      </div>
    </>
  );
}

export default OrderDetail
