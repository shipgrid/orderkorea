import { 
  useEffect
} from 'react'

import {
  Spin,
} from 'antd';

import {
  useGetVehiclesByUserIdQuery
} from '../../../services/api'

import {
  useSelector
} from 'react-redux';

import {
  trackPageView,
  trackFormOpen
} from '../../../lib/analytics'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import VehicleList from '../Inventory/VehicleList';
import ApiLoader from '../../Shared/ApiLoader';
import SortDropdown from '../Inventory/SortDropdown'
import MobileHeader from '../Inventory/MobileHeader';
import useVehicleFilter from '../../../hooks/useVehicleFilter';
import ExtraCard from '../Inventory/ExtraCard';
import InventoryFilter from '../Inventory/InventoryFilter';
import config from '../../../config';

import '../../../assets/inventory.css'

const HomeContainer = () => {

  const session = useSelector((state: any) => state.session);

  const {
    handleFilter,
    filters, 
    finalUrl,
    searchFilters, 
    isDebounceComplete
  } = useVehicleFilter();

  useEffect(() => {
    trackPageView('/inventory')    
  }, [])

  const { 
    data: vehicles = [], 
  } = useGetVehiclesByUserIdQuery({finalUrl: finalUrl}, {
    skip: !isDebounceComplete
  })

  if(!searchFilters) {
    return <ApiLoader/>;
  }

  return (
    <>
      <DashboardContent>
        <div className='inventory-header'>
          <DashboardHeader
            title={'My Inventory'}
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
                  title={'List a Car'}
                  description={'Upload a car onto the Broker Network and receive the best offers and leads in your inbox'}
                  link={config.listACarLink({ email: session.username })}
                  onLinkClick={() => trackFormOpen('List a Car')}
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
