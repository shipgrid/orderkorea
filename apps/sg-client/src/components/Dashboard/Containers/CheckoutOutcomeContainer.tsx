import {
  Stack,
} from '@chakra-ui/react';

import {
  Image,
  Button
} from 'antd'

import {
  useLocation
} from 'react-router-dom'

import {
  useGetCheckoutStatusQuery
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import ApiLoader from "../../Shared/ApiLoader";
import ResourceNotFound from "../../Shared/ResourceNotFound";
import PaymentSuccess from '../../../assets/images/payment-success.png'

const CheckoutContainer = () => {

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)

  const sessionId = searchParams.get('session_id')

  if(!sessionId) {
    return  (
      <Stack minH={'100vh'}>
        <ResourceNotFound />
      </Stack>
    )
  }

  const {
    data,
    isLoading
    } = useGetCheckoutStatusQuery({
      sessionId: sessionId
    })

    if(!data || isLoading) {
      return <ApiLoader/>;
    }

    const {
      customer_email
    } = data

    return (
      <Stack minH={'100vh'}>
        <DashboardContent>
          <DashboardHeader
            title={'Payment'}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 200px)',
          }}>
            <div style={{ width: 550, textAlign: 'center', backgroundColor: 'white', borderRadius: 10, padding: 32 }}>
              <Image src={PaymentSuccess} width={410} preview={false} />
              <p style={{ fontSize: 24, fontWeight: 'bold' }}>Your Vehicle Has Been Reserved</p>
              <p>
                We appreciate your business! An account manager will reach out to you soon at <span style={{ fontWeight: 'bold' }}> { customer_email } </span>.
                If you have any questions, please email <a href="mailto:admin@shipgrid.io">admin@shipgrid.io</a>.
              </p>
              <Button type='primary'>
                Return to Inventory
              </Button>
            </div>
          </div>
        </DashboardContent>
      </Stack>
    );
}

export default CheckoutContainer