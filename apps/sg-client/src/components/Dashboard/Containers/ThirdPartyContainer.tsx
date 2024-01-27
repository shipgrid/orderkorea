import {
  Stack,
  Divider
} from '@chakra-ui/react';

import {
  Switch,
} from 'antd';


import {
  useLocation
} from 'react-router-dom'

import {
  useUpdateAddressMutation,
  useCreateThirdPartyMutation,
  useGetAddressQuery
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import AddressForm from '../Forms/AddressForm';
import ApiLoader from '../../Shared/ApiLoader';
import ResourceNotFound from '../../Shared/ResourceNotFound';

const ThirdPartyContainer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');
  const addressId = searchParams.get('address_id');
  const type = searchParams.get('type');

  if(!orderId) {
    return (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  if(!type) {
    return (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  const { 
    data:address, 
    error, 
    isLoading 
  } = useGetAddressQuery({
    addressId: addressId,
  }, {
    skip: !addressId
  });

  const [
    createThirdParty, { 
      isLoading: createThirdPartyLoading 
    }
  ] = useCreateThirdPartyMutation();

  const [
    updateAddress, { 
      isLoading: updateAddressLoading 
    }
  ] = useUpdateAddressMutation();

  const handleCreateThirdParty = async (values: any) => {
    await createThirdParty({
      order_id: parseInt(orderId),
      type: type,
      ...values
    })
  }

  if(isLoading) {
    return <ApiLoader />
  }

  if((addressId && !address) || error) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
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
                isLoading={createThirdPartyLoading || updateAddressLoading}
              />
            </div>
          }
        />
      </DashboardContent>
    </Stack>
  );
}

export default ThirdPartyContainer
