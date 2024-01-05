import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Switch,
} from 'antd';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import VehicleForm from '../Forms/VehicleForm';

const OrderDetailFormContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Upload Vehicle'}
          description={'Upload a vehicle to the inventory'}
        />
        <Divider my={5}/>
        <Grid
          title={`Upload Vehicle`}
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          centerContent={true}
          content={
            <div style={{ display: 'flex', width: 800 }}>
              <VehicleForm/>
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default OrderDetailFormContainer
