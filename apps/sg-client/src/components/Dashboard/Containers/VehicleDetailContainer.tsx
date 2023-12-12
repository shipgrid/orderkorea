import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleDetail from '../VehicleDetail/VehicleDetail';

const ShippingCalculatorContainer = () => {

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
            <div>
              <VehicleDetail/>
            </div>
          }
        />
        <Divider my={5}/>
      </DashboardContent>
    </Stack>
  );
}

export default ShippingCalculatorContainer
