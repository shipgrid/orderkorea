import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import BillingTable from '../Billing/BillingTable'
import DashboardContent from '../Layout/DashboardContent';

const BillingContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
            title={'Billing Overview'}
            description='Update your billing information and send invoices to your customers'
          />
        <Divider/>
        <BillingTable />
      </DashboardContent>
    </Stack>
  );
}

export default BillingContainer
