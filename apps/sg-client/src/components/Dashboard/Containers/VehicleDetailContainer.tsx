import {
  Stack,
  Divider,
} from '@chakra-ui/react';

import {
  Switch
} from 'antd'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import ShippingCalculator from '../ShippingCalculator/ShippingRates';
import ShippingCalculatorForm from '../Forms/ShippingCalculatorForm';
import Grid from '../../Shared/Grid';
import VehicleImages from '../VehicleDetail/VehicleDetail';

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
              <VehicleImages/>
            </div>
          }
        />
        <Divider my={5}/>
      </DashboardContent>
    </Stack>
  );
}

export default ShippingCalculatorContainer
