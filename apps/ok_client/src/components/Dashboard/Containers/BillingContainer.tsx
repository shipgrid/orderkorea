import {
  Stack,
  Divider
} from '@chakra-ui/react';

import DashboardHeader from '../Layout/DashboardHeader';
import BillingTable from '../Billing/BillingTable'

const BillingContainer = () => {
  return (
    <Stack minH={'100vh'}>
      <DashboardHeader
        title={'Billing Overview'}
        description='Update your billing information and send invoices to your customers'
      />
      <Divider/>
      <BillingTable />
    </Stack>
  );
}

export default BillingContainer
