import {
  Select,
} from 'antd';

interface SortDropdownProps {
  handleFilter: any;
}

const SortDropdown = ({
  handleFilter
}: SortDropdownProps) => {

  return (
    <div style={{ flex: 1 }}>
      <Select
        defaultValue={'highest-price'}
        dropdownStyle={{ backgroundColor: '#f4f4f4' }}
        style={{ minWidth: '95%', width: 180, height: 40, backgroundColor: '#f4f4f4'  }}
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
  )
}

export default SortDropdown;