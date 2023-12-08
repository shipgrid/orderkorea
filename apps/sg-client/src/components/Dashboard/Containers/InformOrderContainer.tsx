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
import PurchaseForm from '../Forms/PurchaseForm';

const InformOrderContainer = () => {

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Inform Order Overview'}
          description={'Start your inform order and and tell us what will be arriving at our warehouse'}
        />
        <Divider my={5}/>
        <Grid
          title="Inform Order"
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          centerContent={true}
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

export default InformOrderContainer
