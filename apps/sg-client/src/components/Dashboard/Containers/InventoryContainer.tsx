import {
  useEffect
} from 'react';

import {
  Spin,
} from 'antd';

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
import useFilter from '../../../hooks/useVehicleFilter'
import ExtraCard from '../Inventory/ExtraCard';
import InventoryFilter from '../Inventory/InventoryFilter';

import config from '../../../config/config';

import '../../../assets/inventory.css'

const HomeContainer = () => {

  const session = useSelector((state: any) => state.session);

  const {
    handleFilter,
    filters, 
    searchFilters, 
    vehicles,
    isDebounceComplete
  } = useFilter();

  useEffect(() => {
    trackPageView('/inventory');
  }, [])

  if(!searchFilters) {
    return <ApiLoader/>;
  }

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
                link={config.forms.requestACarLink({ email: session.username })}
                onLinkClick={() => trackFormOpen('Request a Car')}
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
