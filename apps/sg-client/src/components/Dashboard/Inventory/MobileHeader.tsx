import { 
  useState,
} from 'react';

import {
  Input,
  Button,
  Drawer,
  Affix,
  Collapse,
  Checkbox,
  Space,
  Slider,
} from 'antd';

import type { 
  CollapseProps 
} from 'antd';

import FilterTags from './FilterTags';
import SortDropdown from './SortDropdown';

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

interface FilterTagsProps {
  filters: IFilter;
  handleFilter: any;
  searchFilters: any;
  vehicleCount: number;
}

const MobileHeader = ({
  filters,
  handleFilter,
  searchFilters,
  vehicleCount
}: FilterTagsProps) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


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
            <Input defaultValue={180000} value={filters.mileage[1]} onChange={(e) => handleFilter(e, 'mileage-max')}/>
          </Space>
          <Slider 
            range 
            value={filters.mileage}
            min={0}
            max={180000}
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
      <Affix offsetTop={0}>
        <div className='mobile-inventory-header'>
          <div style={{ display:'flex', height: 60, marginTop: 30 }}>
            <div style={{ flex: 1 }}>
              <Button style={{ height: 40, backgroundColor: '#f4f4f4', width: '95%' }} onClick={showDrawer}> Filter </Button>
            </div>
            <div style={{ flex: 1 }}>
              <SortDropdown
                handleFilter={handleFilter}
              />
            </div>
          </div>
          <div style={{ margin: '0px 0px 0px', flex: 1}}>  
            <FilterTags
              filters={filters}
              handleFilter={handleFilter}
            />
          </div>
          <div>
            <p style={{ fontSize: 12, textAlign:'center', paddingBottom: 10, color: '#5c5e62' }}> Showing results for { vehicleCount ?? 0 } vehicles </p>
          </div>
        </div>
      </Affix>
      <Drawer
        title="Filters"
        placement={'bottom'}
        closable={false}
        onClose={onClose}
        open={open}
        key={'bottom'}
        height={'100%'}
        extra={<Button type="primary" onClick={onClose}> Close </Button>}
      >
        <div style={{ flex: 1, padding: 10}}>
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
          />
        </div>
      </Drawer>
    </>
  )
}

export default MobileHeader;