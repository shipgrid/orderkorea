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
import AddressForm from '../Forms/AddressForm';

import {
  useCreateThirdPartyMutation
} from '../../../services/api'

const DeliveryDestinationContainer = () => {

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');

  if(!orderId) {
    return 'No order found'
  }

  const [createThirdParty, { isLoading }] = useCreateThirdPartyMutation();

  const handleCreateThirdParty = async (values: any) => {
    
    const response = await createThirdParty({
      order_id: parseInt(orderId),
      type: 'delivery_destination',
      ...values
    })
  }

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Delivery Destination'}
          description={'Add a delivery destination to your shipment'}
        />
        <Divider my={5}/>
        <Grid
          title="Add New Delivery Destination"
          actionButtons={[
            <div style={{ display: 'flex' }}>
                <p style={{ marginRight: 10 }}> Show all fields </p>
               <Switch />
            </div>
          ]}
          centerContent={true}
          content={
            <div style={{ display: 'flex', width: 800 }}>
              <AddressForm 
                createThirdParty={handleCreateThirdParty}
                isLoading={isLoading}
              />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default DeliveryDestinationContainer
