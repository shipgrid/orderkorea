import { 
  useState,
  useEffect,
  useRef
} from 'react';

import {
  Form,
  Input,
  Checkbox,
  Space,
  Slider,
  Select,
  Button,
  Drawer,
  Affix,
  Spin,
  Tag,
} from 'antd';
const { Search } = Input;

import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
import {
  useGetFiltersQuery,
  useGetVehiclesQuery
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import VehicleList from '../Home/VehicleList';
import '../../../assets/inventory.css'
import debounce from 'lodash/debounce';
import ApiLoader from '../../Shared/ApiLoader';

interface IFilter {
  search: string[];
  conditions: string[];
  makes: string[]; // Assuming 'makes' is an array of strings
  models: string[]; // Assuming 'models' is an array of strings
  trims: string[];
  price: number[];
  mileage: number[];
  years: number[];
  sort: string[];
}

const HomeContainer = () => {

  const [filters, setFilters] = useState<IFilter>({ 
    search: [],
    conditions: [],
    makes: [], 
    models: [],
    trims: [],
    price: [0, 1200000],
    mileage: [0, 120000],
    years: [1999, 2024],
    sort: ['highest-price']
  });

  const [open, setOpen] = useState(false);
  const [finalUrl, setFinalUrl] = useState('');
  const [isDebounceComplete, setIsDebounceComplete] = useState(false);

  const buildQueryString = (filterObject: any) => {
    const queryParams = [];
    
    for (const key in filterObject) {

      if(filterObject[key].length) {
        queryParams.push(`${key}=${filterObject[key]}`);
      }
    }

    return queryParams.join('&');
  }

  const delayedBuildQueryString = useRef(debounce((filterObject) => {
    const query = buildQueryString(filterObject)
    setIsDebounceComplete(true);
    setFinalUrl(query);
  }, 500, {
    trailing: true
    }
  )).current;

  delayedBuildQueryString(filters);

  const { 
    data:searchFilters, 
    isLoading 
  } = useGetFiltersQuery({finalUrl: finalUrl}, {
    skip: !isDebounceComplete
  });

  const { 
    data: vehicles = [], 
    isLoading: isVehicleListLoading 
  } = useGetVehiclesQuery({finalUrl: finalUrl}, {
    skip: !isDebounceComplete
  });

  useEffect(() => {
    setIsDebounceComplete(false); 
  },[filters])

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleFilter = (values: any, name?: string) => {
    console.log(values, name)
    if(name === 'sort') {
      setFilters({
        ...filters,
        sort: [values]
      })
    }

    if(name === 'search') {
      setFilters({
        ...filters,
        search: [values]
      })
    }

    if(name === 'conditions') {
      setFilters({
        ...filters,
        conditions: [ ...values ]
      })
    }

    if(name === 'make') {
      setFilters({
        ...filters,
        makes: [ ...values ],
      })
    }

    if(name === 'model') {
      setFilters({
        ...filters,
        models: [ ...values ],
      })
    }

    if(name === 'trim') {
      setFilters({
        ...filters,
        trims: [ ...values ],
      })
    }

    if(name === 'years') {
      setFilters({
        ...filters,
        years: values
      })
    }

    if(name === 'mileage') {
      setFilters({
        ...filters,
        mileage: values
      })
    }
    
    if(name === 'price') {
      setFilters({
        ...filters,
        price: values
      })
    }

    if(name === 'conditions-close') {
      const conditions = filters.conditions.filter(item => item !== values);
      setFilters({
        ...filters,
        conditions: conditions
      })
    }

    if(name === 'make-close') {
      const makes = filters.makes.filter(item => item !== values);
      setFilters({
        ...filters,
        makes: makes
      })
    }

    if(name === 'model-close') {
      const models = filters.models.filter(item => item !== values);
      setFilters({
        ...filters,
        models: models
      })
    }

    if(name === 'trim-close') {
      const trims = filters.trims.filter(item => item !== values);
      setFilters({
        ...filters,
        trims: trims
      })
    }

    if(name === 'years-close') {
      setFilters({
        ...filters,
        years: []
      })
    }

    if(name === 'mileage-close') {
      setFilters({
        ...filters,
        mileage: []
      })
    }

    if(name === 'price-close') {
      setFilters({
        ...filters,
        price: []
      })
    }

    if(name === 'search-close') {
      setFilters({
        ...filters,
        search: []
      })
    }
  }

  if(!searchFilters) {
    return <ApiLoader/>;
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Condition',
      children: <Space direction='vertical'>
          <Checkbox.Group 
            className='.ant-checkbox-group'
            name='trim' 
            key={'trim'} 
            options={[
              { label: 'New', value: 'New' },
              { label: 'Used', value: 'Used' }
            ]}
            value={filters.conditions}
            onChange={(values) => handleFilter(values, 'conditions')} 
          />
        </Space>
      ,
    },
    {
      key: '2',
      label: 'Make',
      children: <Space direction='vertical'>
        <Checkbox.Group 
          className='.ant-checkbox-group'
          name='make' 
          key={'make'} 
          options={searchFilters.makes.map((make: any) => ({ label: make.name, value: make.name, key: make.make_id }))}
          onChange={(values) => handleFilter(values, 'make')} 
          value={filters.makes}
        />
      </Space>,
    },
    {
      key: '3',
      label: 'Model',
      collapsible: searchFilters.models.length ? undefined : "disabled",
      children: <Space direction='vertical'>
        <Checkbox.Group 
          className='.ant-checkbox-group'
          name='model' 
          key={'model'} 
          options={searchFilters.models.map((model: any) => ({ label: model.name, value: model.name, key: model.model_id }))}
          onChange={(values) => handleFilter(values, 'model')} 
          value={filters.models}
        />
      </Space>,
    },
    {
      key: '4',
      label: 'Trim',
      collapsible: searchFilters.trims.length ? undefined : "disabled",
      children: <Space direction='vertical'>
        <Checkbox.Group 
          className='.ant-checkbox-group'
          name='trim' 
          key={'trim'} 
          options={searchFilters.trims.map((trim: any) => ({ label: `${trim.name} (${trim.model_id})`, value: trim.name, key: trim.trim_id }))}
          onChange={(values) => handleFilter(values, 'trim')} 
          value={filters.trims}
        />
      </Space>,
    },
    {
      key: '5',
      label: 'Year',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input value={1999}/>
            <Input value={2024}/>
          </Space>
          <Slider 
            range 
            value={filters.years}
            min={1999} 
            max={2024} 
            onChange={(e) => handleFilter(e, 'years')}
          />    
        </div>
      )
    },
    {
      key: '6',
      label: 'Mileage',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={0}/>
            <Input defaultValue={12000}/>
          </Space>
          <Slider 
            range 
            value={filters.mileage}
            min={0}
            max={120000}
            onChange={(e) => handleFilter(e, 'mileage')}
          />    
        </div>
      )
    },
    {
      key: '7',
      label: 'Price',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={0}/>
            <Input defaultValue={1200000}/>
          </Space>
          <Slider 
            range 
            value={filters.price}
            min={0}
            max={730000}
            onChange={(e) => handleFilter(e, 'price')}
          />  
        </div>
      )
    },
  ];

  return (
    <>
      <Spin spinning={isLoading}> 
      <DashboardContent>
        <div className='inventory-header'>
          <DashboardHeader
            title={'Inventory'}
            action={[
              <div>
                <div> Sort by </div>
                <Select
                  defaultValue={'highest-price'}
                  style={{ width: 180, height: 40 }}
                  onChange={(e) => handleFilter(e, 'sort')}
                  options={[
                    { value: 'highest-price', label: 'Highest price' },
                    { value: 'lowest-price', label: 'Lowest price' },
                    { value: 'lowest-mileage', label: 'Lowest mileage' },
                    { value: 'oldest', label: 'Oldest vehicles' },
                    { value: 'newest', label: 'Newest vehicles' },
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
                  defaultValue={'highest-price'}
                  dropdownStyle={{ backgroundColor: '#f4f4f4' }}
                  style={{ height: 40, backgroundColor: '#f4f4f4', width: '95%' }}
                  onChange={(e) => handleFilter(e, 'sort')}
                  options={[
                    { value: 'highest-price', label: 'Highest price' },
                    { value: 'lowest-price', label: 'Lowest price' },
                    { value: 'lowest-mileage', label: 'Lowest mileage' },
                    { value: 'oldest', label: 'Oldest vehicles' },
                    { value: 'newest', label: 'Newest vehicles' },
                  ]}
                />
              </div>
            </div>
            <div style={{ margin: '0px 0px 0px', flex: 1}}>  
              {
                filters.search.length > 0 && (
                  <Tag closable onClose={(e) => handleFilter(e, 'search-close')} key={'search'}>
                    {filters.search}
                  </Tag>
                )  
              }
              { filters.conditions.length > 0 && (filters.conditions.map((condition) => (
                <Tag closeIcon onClose={(e) => handleFilter(e, 'conditions-close')} key={condition}>
                  {condition}
                </Tag>
              )))}
              {
                filters.makes.length > 0 && (filters.makes.map((make) => (
                  <Tag closeIcon onClose={(e) => handleFilter(make, 'make-close')} key={make}>
                    {make}
                  </Tag>
                )))
              }
              {
                filters.models.length > 0 && (filters.models.map((model) => (
                  <Tag closeIcon onClose={(e) => handleFilter(model, 'model-close')} key={model}>
                    {model}
                  </Tag>
                )))
              }
              {
                filters.trims.length > 0 && (filters.trims.map((trim) => (
                  <Tag closeIcon onClose={(e) => handleFilter(trim, 'trim-close')} key={trim}>
                    {trim}
                  </Tag>
                )))
              }
              {
                filters.years.length > 0 && (
                  <Tag key={'years'}>
                    Year {filters.years[0]} - {filters.years[1]}
                  </Tag>
                )
              }
              {
                filters.mileage.length > 0 && (
                  <Tag key={'mileage'}>
                    Mileage {filters.mileage[0]}km - {filters.mileage[1]}km
                  </Tag>
                )
              }
              {
                filters.price.length > 0 && (
                  <Tag key={'price'}>
                    Price {filters.price[0]}km - {filters.price[1]}km
                  </Tag>
                )
              }
            </div>
            <div>
              <p style={{ fontSize: 12, textAlign:'center', paddingBottom: 10, color: '#5c5e62' }}> Showing results for 823 vehicles </p>
            </div>
    
          </div>
        </Affix>
        <div style={{ display: 'flex', margin: '64px 24px' }}>
          <Spin spinning={isLoading}>
          <div className='car-filters'>
            <Form
              layout="vertical"
              style={{ flex: 1, padding: 10}}
            >
              <Search name='search' placeholder='Make, model, or keyword' onSearch={(value, e) => handleFilter(value, 'search')}/>
              <div style={{ margin: '5px 0px 5px', flex: 1}}>  
                {
                  filters.search.length > 0 && (
                    <Tag closable onClose={(e) => handleFilter(e, 'search-close')} key={'search'}>
                      {filters.search}
                    </Tag>
                  )  
                }
                { filters.conditions.length > 0 && (filters.conditions.map((condition) => (
                  <Tag closeIcon onClose={(e) => handleFilter(e, 'conditions-close')} key={condition}>
                    {condition}
                  </Tag>
                )))}
                {
                  filters.makes.length > 0 && (filters.makes.map((make) => (
                    <Tag closeIcon onClose={(e) => handleFilter(make, 'make-close')} key={make}>
                    {make}
                    </Tag>
                  )))
                }
                {
                  filters.models.length > 0 && (filters.models.map((model) => (
                    <Tag closeIcon onClose={(e) => handleFilter(model, 'model-close')} key={model}>
                      {model}
                    </Tag>
                  )))
                }
                {
                  filters.trims.length > 0 && (filters.trims.map((trim) => (
                    <Tag closeIcon onClose={(e) => handleFilter(trim, 'trim-close')} key={trim}>
                      {trim}
                    </Tag>
                  )))
                }
                {
                  filters.years.length > 0 && (
                    <Tag key={'years'}>
                      Year {filters.years[0]} - {filters.years[1]}
                    </Tag>
                  )
                }
                {
                  filters.mileage.length > 0 && (
                    <Tag key={'mileage'}>
                      Mileage {filters.mileage[0]}km - {filters.mileage[1]}km
                    </Tag>
                  )
                }
                {
                  filters.price.length > 0 && (
                    <Tag key={'price'}>
                      Price {filters.price[0]}km - {filters.price[1]}km
                    </Tag>
                  )
                }
              </div>
              <Collapse 
                defaultActiveKey={['1']} 
                bordered={false} 
                items={items} 
                expandIconPosition={'end'}
                accordion
                />
            </Form>
          </div>
          </Spin>
          <VehicleList
            vehicles={vehicles}
            isLoading={isVehicleListLoading}
          />
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
              <Search placeholder='Make, model, or keyword'/>
            </Form.Item>
            <div style={{ margin: '5px 0px 5px'}}>  
              {
                filters.search.length > 0 && (
                  <Tag closable onClose={(e) => handleFilter(e, 'search-close')} key={'search'}>
                    {filters.search}
                  </Tag>
                )  
              }
              { filters.conditions.length > 0 && (filters.conditions.map((condition) => (
                <Tag closeIcon onClose={(e) => handleFilter(condition, 'conditions-close')} key={condition}>
                  {condition}
                </Tag>
              )))}
              {
                filters.makes.length > 0 && (filters.makes.map((make) => (
                  <Tag closeIcon onClose={(e) => handleFilter(make, 'make-close')} key={make}>
                    {make}
                  </Tag>
                )))
              }
              {
                filters.models.length > 0 && (filters.models.map((model) => (
                  <Tag closeIcon onClose={(e) => handleFilter(model, 'model-close')} key={model}>
                    {model}
                  </Tag>
                )))
              }
              {
                filters.years.length > 0 && (
                  <Tag key={'years'}>
                    Year {filters.years[0]} - {filters.years[1]}
                  </Tag>
                )
              }
              {
                filters.mileage.length > 0 && (
                  <Tag key={'mileage'}>
                    Mileage {filters.mileage[0]}km - {filters.mileage[1]}km
                  </Tag>
                )
              }
              {
                filters.price.length > 0 && (
                  <Tag key={'price'}>
                    Price {filters.price[0]}km - {filters.price[1]}km
                  </Tag>
                )
              }
            </div>
            <Collapse 
              defaultActiveKey={['1']} 
              bordered={false} 
              items={items} 
              expandIconPosition={'end'}
              />
          </Form>
        </div>
      </Drawer>
      </Spin>
    </>
  );
}

export default HomeContainer;
