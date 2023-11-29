import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Switch,
} from 'antd';

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../Layout/Grid';
import PurchaseForm from '../../Shared/PurchaseForm';

const PurchaseOrderContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Purchase Order Overview'}
          description={'Start your purchase order and we will take care of the rest'}
        />
        <Divider my={5}/>
        <Grid
          title="Purchase Order"
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          content={
            <div style={{ display: 'flex', width: 800 }}>
              <PurchaseForm />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default PurchaseOrderContainer
