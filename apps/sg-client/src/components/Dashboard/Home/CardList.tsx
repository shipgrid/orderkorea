import { 
  useEffect
} from 'react';

import {
  Button,
  Space,
  Card,
  Image,
} from 'antd';

import {
  useNavigate,
} from 'react-router-dom'

import { 
  startTransition 
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  trackPageView,
  trackFormOpen
} from '../../../lib/analytics'

import PricePana from '../../../assets/images/price-pana.png';
import PaymentSuccess from '../../../assets/images/payment-success.png';
import Settings from '../../../assets/images/settings.png';
import AccountSettings from '../../../assets/images/accesories-bro.png';
import CarPana from '../../../assets/images/car-pana.png';

import '../../../assets/home.css'
import config from '../../../config/config';

const HomeContainer = () => {

  const navigate = useNavigate();
  const session = useSelector((state: any) => state.session);

  const onListCarClick = () => {
    trackFormOpen('List a Car');
    window.location.href = config.forms.listACarLink({ email: session.username })
  };

  const cards = [
    {
      title: 'Buy Cars',
      description: 'Buy cars from our network of brokers and traders.',
      image: PricePana,
      onClick: () => startTransition(() => navigate('/broker-inventory'))
    }, 
    {
      title: 'Sell Cars',
      description: 'Upload cars and sell to other brokers and traders.',
      image: PaymentSuccess,
      onClick: onListCarClick
    }, 
    {
      title: 'My Inventory',
      description: 'Manage your inventory of cars that you have for sale.',
      image: AccountSettings,
      onClick: () => startTransition(() => navigate('/inventory'))
    }, 
    {
      title: 'My Orders',
      description: 'Manage and view your ongoing or completed orders that you have with other brokers.',
      image: CarPana,
      onClick: () => startTransition(() => navigate('/orders'))
    }, 
    // {
    //   title: 'My Account',
    //   description: 'Manage your accounts.',
    //   image: Settings,
    //   onClick: () => startTransition(() => navigate('/orders'))
    // }
  ]
  
  useEffect(() => {
    trackPageView('/')
  }, [])

  return (
    <Space style={{ display: 'flex', padding: 5, justifyContent: 'center' }} wrap>
      {
        cards.map((card, index) => (
          <Card 
            key={index} 
            onClick={card.onClick} 
            hoverable 
            title={card.title} 
            bordered={false} 
            style={{ width: 340, height: '100%', cursor: 'pointer' }} 
            cover={<Image preview={false} src={card.image} alt={card.title} 
            style={{ width: 300 }} />}>
            <div style={{ height: 85}}>
              {card.description}
            </div>
            <Button type='primary' style={{ width: '100%' }}> {card.title} </Button>
          </Card>
        ))
      }
    </Space>
  );
}

export default HomeContainer
