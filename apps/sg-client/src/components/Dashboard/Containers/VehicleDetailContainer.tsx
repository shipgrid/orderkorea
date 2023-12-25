import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleDetail from '../VehicleDetail/VehicleDetail';

const VehicleDetailContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Vehicle Details'}
          description={'View your vehicle details'}
        />
        <Divider my={5}/>
        <Grid
          title="2023 Mazda - Mazda 3"
          content={
            <VehicleDetail/>
          }
        />
        <Divider my={5}/>
      </DashboardContent>
    </Stack>
  );
}

export default VehicleDetailContainer
