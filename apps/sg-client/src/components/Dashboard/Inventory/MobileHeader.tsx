import { 
  useState,
} from 'react';

import {
  Input,
  Button,
  Drawer,
  Affix,
  Collapse
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
  filterItems: any;
  vehicleCount: number;
}


const MobileHeader = ({
  filters,
  handleFilter,
  filterItems,
  vehicleCount
}: FilterTagsProps) => {

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
            items={filterItems} 
            expandIconPosition={'end'}
          />
        </div>
      </Drawer>
    </>
  )
}

export default MobileHeader;