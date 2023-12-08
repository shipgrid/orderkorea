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

const ShippingCalculatorContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Shipping Calculator'}
          description={'Calculate shipping rates for your orders'}
        />
        <Divider my={5}/>
        <Grid
          title="Calculate your order ahead of time"
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          centerContent={true}
          content={
            <div style={{ width: 800, }}>
              <ShippingCalculatorForm />
            </div>
          }
        />
        <Divider my={5}/>
        <Grid
          title="Shipping Rates"
          content={
            <ShippingCalculator />
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default ShippingCalculatorContainer
