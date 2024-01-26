import {
  Stack,
} from '@chakra-ui/react';

import {
  Image,
  Button
} from 'antd'

import {
  startTransition
} from 'react';

import {
  useNavigate
} from 'react-router-dom'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import PaymentSuccess from '../../../assets/images/payment-success.png'

const SellerContactedContainer = () => {
  const navigate = useNavigate()

  return (
    <Stack minH={'100vh'}>
      <DashboardContent>
        <DashboardHeader
          title={'Broker Network'}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}>
          <div style={{ maxWidth: 550, textAlign: 'center', backgroundColor: 'white', borderRadius: 10, padding: 32 }}>
            <Image src={PaymentSuccess} width={320} preview={false} />
            <p style={{ fontSize: 24, fontWeight: 'bold' }}>You have contacted the seller</p>
            <p>
              You will be connected once the seller has agreed to the offer.
              If you have any questions, please email <a href="mailto:admin@shipgrid.io">admin@shipgrid.io</a>.
            </p>
            <Button type='primary' onClick={() => startTransition(() => navigate(`/`))}>
              Return to the Broker Network
            </Button>
          </div>
        </div>
      </DashboardContent>
    </Stack>
  );
}

export default SellerContactedContainer