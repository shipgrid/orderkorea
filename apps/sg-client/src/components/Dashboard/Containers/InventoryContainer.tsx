import { 
  useState,
  useEffect,
  useRef
} from 'react';

import {
  Input,
  Checkbox,
  Space,
  Slider,
  Collapse
} from 'antd';

import type { 
  CollapseProps 
} from 'antd';

import {
  useGetFiltersQuery,
  useGetVehiclesQuery
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import VehicleList from '../Home/VehicleList';
import debounce from 'lodash/debounce';
import ApiLoader from '../../Shared/ApiLoader';
import FilterTags from '../Inventory/FilterTags'
import SortDropdown from '../Inventory/SortDropdown'
import MobileHeader from '../Inventory/MobileHeader';

import '../../../assets/inventory.css'

const { Search } = Input;

interface IFilter {
  search: string[];
  conditions: string[];
  makes: string[]; 
  models: string[]; 
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

  const handleFilter = (values: any, name?: string) => {
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
      <DashboardContent>
        <div className='inventory-header'>
          <DashboardHeader
            title={'Inventory'}
            action={[
              <div>
                <div> Sort by </div>
                <SortDropdown
                  handleFilter={handleFilter}
                />
              </div>,
            ]}
          />              
        </div>
        <MobileHeader
          filters={filters}
          handleFilter={handleFilter}
          filterItems={items}
          vehicleCount={vehicles.length}
        />
        <div style={{ display: 'flex', margin: '64px 24px' }}>
          <div className='car-filters'>
            <Search name='search' placeholder='Make, model, or keyword' onSearch={(value) => handleFilter(value, 'search')}/>
            <FilterTags
              filters={filters}
              handleFilter={handleFilter}
            />
            <Collapse 
              defaultActiveKey={['1']} 
              bordered={false} 
              items={items} 
              expandIconPosition={'end'}
              accordion
            />
          </div>
          <VehicleList
            vehicles={vehicles}
            isLoading={isVehicleListLoading}
          />
        </div>
      </DashboardContent>
    </>
  );
}

export default HomeContainer;
