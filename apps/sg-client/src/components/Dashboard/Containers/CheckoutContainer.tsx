import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';

import {
  Stack,
} from '@chakra-ui/react';

import {
  useLocation
} from 'react-router-dom'

import {
  useCheckoutQuery
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import ApiLoader from "../../Shared/ApiLoader";
import ResourceNotFound from "../../Shared/ResourceNotFound";

const stripePromise = loadStripe("pk_test_51NsSbzEVtcyiI2ICnKkAk1K4Vm9IsBlyL0QAlmTHkrfgSJVLYTtC6K59PDBC7YB8eXUtyN7PdkfVaWUz9iNLIcRl00PNfuGvPS");

const CheckoutContainer = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const vehicleId = searchParams.get('vehicle_id')

  if(!vehicleId) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  const {
    data,
    isLoading
    } = useCheckoutQuery({
      vehicle_id: vehicleId
    })

    if(!data || isLoading) {
      return <ApiLoader/>;
    }

    const {
      client_secret
    } = data

    return (
      <Stack minH={'100vh'}>
        <DashboardContent>
          <DashboardHeader
            title={'Checkout'}
            description={'Review and complete your order'}
          />
          <div>
            {client_secret && (
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{
                  clientSecret: client_secret 
                }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
        </DashboardContent>
      </Stack>
    );
}

export default CheckoutContainer