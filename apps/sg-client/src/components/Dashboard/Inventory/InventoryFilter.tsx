import {
  Input,
  Checkbox,
  Space,
  Slider,
  Collapse,
} from 'antd';

import type { 
  CollapseProps 
} from 'antd';

import FilterTags from '../Inventory/FilterTags'
import config from '../../../config/config'
import '../../../assets/inventory.css'

const { Search } = Input;

interface InventoryFilterProps {
  filters: any;
  searchFilters: any;
  handleFilter: any;
}

const InventoryFilter = ({
  filters,
  searchFilters,
  handleFilter,
}: InventoryFilterProps) => {

  const items: CollapseProps['items'] = [
    {
      key: 'condition',
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
      key: 'make',
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
      key: 'model',
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
      key: 'trim',
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
      key: 'year',
      label: 'Year',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={config.filters.years.min} value={filters.years[0]} onChange={(e) => handleFilter(e, 'years-min')}/>
            <Input defaultValue={config.filters.years.max} value={filters.years[1]} onChange={(e) => handleFilter(e, 'years-max')}/>
          </Space>
          <Slider 
            range 
            value={filters.years}
            min={config.filters.years.min} 
            max={config.filters.years.max} 
            onChange={(e) => handleFilter(e, 'years')}
          />    
        </div>
      )
    },
    {
      key: 'mileage',
      label: 'Mileage',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={config.filters.mileage.min} value={filters.mileage[0]} onChange={(e) => handleFilter(e, 'mileage-min')}/>
            <Input defaultValue={config.filters.mileage.max} value={filters.mileage[1]} onChange={(e) => handleFilter(e, 'mileage-max')}/>
          </Space>
          <Slider 
            range 
            value={filters.mileage}
            min={config.filters.mileage.min}
            max={config.filters.mileage.max}
            onChange={(e) => handleFilter(e, 'mileage')}
          />    
        </div>
      )
    },
    {
      key: 'price',
      label: 'Price',
      children: (
        <div>
          <Space direction='horizontal'>
            <Input defaultValue={config.filters.prices.min} value={filters.price[0]} onChange={(e) => handleFilter(e, 'price-min')}/>
            <Input defaultValue={config.filters.prices.max} value={filters.price[1]} onChange={(e) => handleFilter(e, 'price-max')}/>
          </Space>
          <Slider 
            range 
            value={filters.price}
            min={config.filters.prices.min}
            max={config.filters.prices.max}
            onChange={(e) => handleFilter(e, 'price')}
          />  
        </div>
      )
    },
  ];

  return (
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
  )
}

export default InventoryFilter;