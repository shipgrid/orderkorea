import {
  Button
} from 'antd'

import {
  startTransition,
} from 'react'

import {
  useNavigate,
  useLocation
} from 'react-router-dom'

import {
  useGetOrderQuery
} from '../../../services/api'

import DashboardHeader from '../Layout/DashboardHeader';
import DashboardContent from '../Layout/DashboardContent';
import Grid from '../../Shared/Grid';
import OrderDetail from '../OrderDetail/OrderDetail';
import ThirdPartyTable from '../OrderDetail/ThirdPartyTable';
import AddThirdPartyDropdownMenu from '../OrderDetail/AddThirdPartyDropdownMenu';
import AddDocumentModal from '../OrderDetail/AddDocumentModal';
import VehicleTable from '../OrderDetail/VehicleTable';
import DocumentTable from '../OrderDetail/DocumentTable';
import ApiLoader from '../../Shared/ApiLoader';
import ResourceNotFound from '../../Shared/ResourceNotFound';
import config from '../../../config'

const OrderDetailContainer = () => {
  const navigate = useNavigate();
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get('order_id');

  if(!orderId) {
    return  (
      <div>
        <ResourceNotFound />
      </div>
    )
  }

  const { 
    data:order, 
    error, 
    isLoading 
  } = useGetOrderQuery(orderId);

  if(isLoading) {
    return <ApiLoader />
  }

  if(!order || error) {
    return  (
      <div>
        <ResourceNotFound />
      </div>
    )
  }

  return (
    <div>
      <DashboardContent>
        <DashboardHeader
          title={'Order Details'}
          description={'View your order details'}
        />
        <div style={{ margin: '64px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {
            config.featureFlags.showOrderDetails && (
              <div>
                <Button style={{marginBottom: 5, marginRight: 5 }} onClick={ () => startTransition(() => navigate(`/order-detail?order_id=${order?.order_id}`)) }> Edit </Button>
                <Grid          
                title='Shipment Details'
                  content={
                    <OrderDetail
                      order={order}
                    />
                  }
                />
              </div>
            )
          }
          {
            config.featureFlags.showOrderThirdParty && (
              <div style={{ margin: '24px 0px', flex: 1 }}>
                <AddThirdPartyDropdownMenu
                  orderId={orderId}
                />
                <Grid
                  title='Shipper, Consignee and Contacts'
                  content={
                    <ThirdPartyTable
                      thirdParties={order.thirdParties}
                    />
                  }
                />
              </div>
            )
          }
          {
            config.featureFlags.showOrderDocuments && (
              <div style={{ margin: '24px 0px'}}>
                <AddDocumentModal
                  orderId={orderId}
                />
                <Grid
                  title='Documents'
                  content={
                    <DocumentTable
                      documents={order.documents}
                    />
                  }
                />
              </div>
            )
          }
          {
            config.featureFlags.showOrderVehicles && (
              <div style={{ margin: '24px 0px'}}>
                <Grid
                  title='Vehicles'
                  content={
                    <VehicleTable
                      vehicles={order.vehicles}
                    />
                  }
                />
              </div> 
            )
          }
        </div>
      </DashboardContent>
    </div>
  );
}

export default OrderDetailContainer
