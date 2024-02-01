import ApiLoader from '../../Shared/ApiLoader';
import SortDropdown from '../Inventory/SortDropdown'

import '../../../assets/inventory.css'

interface InventorySortFilterProps {
  handleFilter: (e: any) => void; 
  searchFilters: any;
}

const InventorySortFilter = ({
  handleFilter,
  searchFilters
}: InventorySortFilterProps) => {

  if(!searchFilters) {
    return <ApiLoader/>;
  }

  return (
    <div>
      <div> Sort by </div>
      <SortDropdown
        handleFilter={handleFilter}
      />
    </div>
  );
}

export default InventorySortFilter;
