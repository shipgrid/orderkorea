import {
  Input,
  Checkbox,
  Space,
  Slider,
  Collapse,
  Spin,
} from 'antd';

import type { 
  CollapseProps 
} from 'antd';

import {
  useSelector
} from 'react-redux';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import VehicleList from '../Inventory/VehicleList';
import ApiLoader from '../../Shared/ApiLoader';
import FilterTags from '../Inventory/FilterTags'
import SortDropdown from '../Inventory/SortDropdown'
import MobileHeader from '../Inventory/MobileHeader';
import useFilter from '../../../hooks/useVehicleFilter'
import ExtraCard from '../Inventory/ExtraCard';
import InventoryFilter from '../Inventory/InventoryFilter';

import config from '../../../config';

import '../../../assets/inventory.css'

const { Search } = Input;

const HomeContainer = () => {

  const session = useSelector((state: any) => state.session);

  const {
    handleFilter,
    filters, 
    searchFilters, 
    vehicles,
    isDebounceComplete
  } = useFilter();

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
            <Input defaultValue={1999} value={filters.years[0]} onChange={(e) => handleFilter(e, 'years-min')}/>
            <Input defaultValue={2024} value={filters.years[1]} onChange={(e) => handleFilter(e, 'years-max')}/>
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
            <Input defaultValue={0} value={filters.mileage[0]} onChange={(e) => handleFilter(e, 'mileage-min')}/>
            <Input defaultValue={120000} value={filters.mileage[1]} onChange={(e) => handleFilter(e, 'mileage-max')}/>
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
            <Input defaultValue={0} value={filters.price[0]} onChange={(e) => handleFilter(e, 'price-min')}/>
            <Input defaultValue={1200000} value={filters.price[1]} onChange={(e) => handleFilter(e, 'price-max')}/>
          </Space>
          <Slider 
            range 
            value={filters.price}
            min={0}
            max={1200000}
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
            title={'Broker Inventory'}
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
          searchFilters={searchFilters}
          vehicleCount={vehicles.length}
        />
        <div style={{ display: 'flex', margin: '32px 24px' }}>
          <InventoryFilter
            searchFilters={searchFilters}
            filters={filters}
            handleFilter={handleFilter}
          />
          <Spin spinning={!isDebounceComplete}> 
          <VehicleList
            extra={
              <ExtraCard
                title="Can't find the car you want?"
                description='Access the Broker Network to receive the best offers in your inbox within 48 hours'
                link={config.requestACarLink({ email: session.username })}
              />
            }
            vehicles={vehicles}
          />
          </Spin>
      
        </div>
      </DashboardContent>
    </>
  );
}

export default HomeContainer;
