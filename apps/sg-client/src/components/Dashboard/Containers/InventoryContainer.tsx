import { 
  useState 
} from 'react';

import {
  Form,
  Input,
  Checkbox,
  Space,
  Slider,
  Select,
  Row,
  Col,
  Button,
  Drawer,
  Affix
} from 'antd';
const { Search } = Input;

import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';


import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import VehicleList from '../Home/VehicleList';
import '../../../assets/inventory.css'

interface IFilter {
  makes: string[]; // Assuming 'makes' is an array of strings
  models: string[]; // Assuming 'models' is an array of strings
}

const carMakes = [
  'Acura',
  'Alfa Romeo',
  'Audi',
  'BMW',
  'Buick',
  'Cadillac',
  'Caliber',
  'Chevrolet',
  'Chrysler',
  'Dodge',
  'Fiat',
  'Ford',
  'GMC',
  'Genesis',
  'Honda',
  'Hummer',
  'Hyundai',
  'Infiniti',
  'Jaguar',
  'Jeep',
  'Kia',
  'Land Rover',
  'Lexus',
  'Lincoln',
  'MINI',
  'Maserati',
  'Mazda',
  'Mercedes-AMG',
  'Mercedes-Benz',
  'Mitsubishi',
  'Morgan',
  'Nissan',
  'Polestar',
  'Pontiac',
  'Porsche',
  'Ram',
  'Saab',
  'Saturn',
  'Scion',
  'Smart',
  'Subaru',
  'Suzuki',
  'Tesla',
  'Toyota',
  'Volkswagen',
  'Volvo'
];


const HomeContainer = () => {
  const [filters] = useState<IFilter>({ 
    makes: [], 
    models: [] 
  });

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Condition',
      children: <Space direction='vertical'>
          <Checkbox>New</Checkbox>
          <Checkbox>Used</Checkbox>
        </Space>
      ,
    },
    {
      key: '2',
      label: 'Make',
      children: <Space direction='vertical'>
        {
          carMakes.map((make) => (
            <Checkbox key={make}>{make}</Checkbox>
          ))
        }
      </Space>,
    },
    {
      key: '3',
      label: 'Model',
      children: <Space direction='vertical'>
        {
          carMakes.map((make) => (
            <Checkbox key={make}>{make}</Checkbox>
          ))
        }
      </Space>,
    },
    {
      key: '4',
      label: 'Year',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={1999}/>
            <Input defaultValue={2024}/>
          </Space>
          <Slider range defaultValue={[2002, 2015]} min={1999} max={2024}/>    
        </div>
      )
    },
    {
      key: '3',
      label: 'Mileage',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={0}/>
            <Input defaultValue={1200000}/>
          </Space>
          <Slider range defaultValue={[0, 1200000]} />    
        </div>
      )
    },
    {
      key: '5',
      label: 'Price',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={0}/>
            <Input defaultValue={1200000}/>
          </Space>
          <Slider range defaultValue={[0, 730000]} />  
        </div>
      )
    },
  ];

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <DashboardContent>
        <div className='inventory-header'>
          <DashboardHeader
            title={'Inventory'}
            action={[
              <div>
                <div> Sort by </div>
                <Select
                  defaultValue="1"
                  style={{ width: 180, height: 40 }}
                  options={[
                    { value: '1', label: 'Highest price' },
                    { value: '2', label: 'Lowest price' },
                    { value: '3', label: 'Lowest mileage' },
                    { value: '4', label: 'Oldest vehicles' },
                    { value: '5', label: 'Newest vehicles' },
                  ]}
                />
              </div>,
            ]}
          />              
        </div>
        <Affix offsetTop={0}>
          <div className='mobile-inventory-header'>
            <div style={{ display:'flex', height: 60, marginTop: 30 }}>
              <div style={{ flex: 1 }}>
                <Button style={{ height: 40, backgroundColor: '#f4f4f4', width: '95%' }} onClick={showDrawer}> Filter </Button>
              </div>
              <div style={{ flex: 1 }}>
                <Select
                  defaultValue="1"
                  dropdownStyle={{ backgroundColor: '#f4f4f4' }}
                  style={{ height: 40, backgroundColor: '#f4f4f4', width: '95%'  }}
                  options={[
                    { value: '1', label: 'Highest price' },
                    { value: '2', label: 'Lowest price' },
                    { value: '3', label: 'Lowest mileage' },
                    { value: '4', label: 'Oldest vehicles' },
                    { value: '5', label: 'Newest vehicles' },
                  ]}
                />
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, textAlign:'center', paddingBottom: 10, color: '#5c5e62' }}> Showing results for 823 vehicles </p>
            </div>
    
          </div>
        </Affix>
        <div style={{ display: 'flex', margin: '64px 24px' }}>
          <div className='car-filters'>
            <Form
              layout="vertical"
              style={{ flex: 1, padding: 10}}
            >
              <Form.Item name='keyword'>
                <Search placeholder='Make, model, or keyword' />
              </Form.Item>
              <Collapse 
                defaultActiveKey={['1']} 
                bordered={false} 
                items={items} 
                expandIconPosition={'end'}
                />
            </Form>
          </div>
          <VehicleList filters={filters}/>
        </div>
      </DashboardContent>
      <Drawer
        title="Filters"
        placement={'bottom'}
        closable={false}
        onClose={onClose}
        open={open}
        key={'bottom'}
        height={'90%'}
        extra={
          <Button type="primary" onClick={onClose}>
            Close
          </Button>
        }
      >
        <div>
          <Form
            layout="vertical"
            style={{ flex: 1, padding: 10}}
          >
            <Form.Item name='keyword'>
              <Search placeholder='Make, model, or keyword' />
            </Form.Item>
            <Collapse 
              defaultActiveKey={['1']} 
              bordered={false} 
              items={items} 
              expandIconPosition={'end'}
              />
          </Form>
        </div>
      </Drawer>
    </>
  );
}

export default HomeContainer;
