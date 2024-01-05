import { 
  useState 
} from 'react';

import { 
  Stack, 
  Divider 
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleSearchForm from '../Forms/VehicleSearchForm';
import VehicleList from '../Home/VehicleList';

interface IFilter {
  makes: string[]; // Assuming 'makes' is an array of strings
  models: string[]; // Assuming 'models' is an array of strings
}

const HomeContainer = () => {
  const [filters, setFilters] = useState<IFilter>({ 
    makes: [], 
    models: [] 
  });

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Inventory Overview'}
          description="Here’s the best match for you."
        />
        <Divider my={5}/>
        <Grid
          title='Search for a vehicle'
          content={
            <VehicleSearchForm onFiltersChange={setFilters}/>
          }
        />
        <div style={{ marginTop: 10 }}></div>
        <VehicleList filters={filters}/>
      </DashboardContent>
    </Stack>
  );
}

export default HomeContainer;
