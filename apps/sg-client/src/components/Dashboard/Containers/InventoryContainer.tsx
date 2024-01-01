import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleSearchForm from '../Forms/VehicleSearchForm';
import VehicleTable from '../Home/VehicleTable'

const HomeContainer = () => {

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
            <VehicleSearchForm/>
          }
        />
        <div style={{ marginTop: 10 }}></div>
        <div>
          <VehicleTable/>
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default HomeContainer
