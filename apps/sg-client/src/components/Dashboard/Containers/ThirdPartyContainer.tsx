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
  useUpdateAddressMutation,
  useCreateThirdPartyMutation,
  useGetAddressQuery
} from '../../../services/api'

const ThirdPartyContainer = () => {

  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');
  const addressId = searchParams.get('address_id');
  const type = searchParams.get('type');

  if(!orderId) {
    return 'No order found'
  }

  if(!type) {
    return 'No type found'
  }

  const { data:address, error, isLoading: getAddressLoading } = useGetAddressQuery(addressId);

  const [createThirdParty, { isLoading }] = useCreateThirdPartyMutation();
  const [updateAddress, { isLoading: updateAddressLoading }] = useUpdateAddressMutation();

  const handleCreateThirdParty = async (values: any) => {
    
    await createThirdParty({
      order_id: parseInt(orderId),
      type: type,
      ...values
    })
  }

  if(addressId && !address) {
    return 'No address found'
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
                address={address}
                createThirdParty={handleCreateThirdParty}
                updateAddress={updateAddress}
                isLoading={isLoading}
              />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default ThirdPartyContainer
