import { 
  useEffect
} from 'react';

import {
  Button,
  Space,
  Drawer
} from 'antd';

import {
  trackPageView,
} from '../../../lib/analytics'

interface AboutMoreDrawerProps {
  showDrawer: () => void;
  onClose: () => void;
  open: boolean;
}  

const AboutMoreDrawer = ({
  onClose,
  open
}: AboutMoreDrawerProps) => {

  useEffect(() => {
    trackPageView('/')
  }, [])

  return (
    <>
      <Drawer
        title="Welcome to Shipgrid"
        placement={'bottom'}
        closable={true}
        onClose={onClose}
        open={open}
        key={'bottom'}
        height={'85%'}
        extra={[
          <Button onClick={onClose} type='primary'> Close </Button>
        ]}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Space direction='vertical' className='learn-more-content' wrap>
            <h1 style={{ marginBottom: 12 }}>Welcome to Shipgrid</h1>
            <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>
              The premier workstation for car brokers around the world. By being a part of Shipgrid, you can buy, sell, and organize your inventory and access the global market, connecting with brokers and dealerships all over the world.
            </div>
            <div style={{ margin: '12px 0px'}}>
              <h2> Eligibility </h2>
              <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>
                Shipgrid is an enclosed platform accessible for auto traders who have been vetted for their quality, reliability, and trustworthiness. 
                We review each application to ensure that our platform is safe, secure, and compliant for all users.
                <br/>
                <br/>
                Brokers who abuse the platform will be removed from Shipgrid and the Broker Network.
              </div>
            </div>
            <div style={{ margin: '12px 0px'}}>
              <h2> Code of Conduct </h2>
              <div style={{ fontSize: 16, fontWeight: 400, marginBottom: 12 }}>
                Inventory must be accurately described and priced. We do not tolerate false advertising or misleading information. 
                <br/>
                <br/>
                All listed inventory must be verified by 3 interior photos, 3 exterior photos, VIN number, mileage, make, model, year, and location of the vehicle. 
                <br/>
                <br/>
                If the listed inventory has been sold or no longer available, please remove the listing immediately. If not, the listing will be removed automatically after 7 days. 
                <br/>
                <br/>
                Any illegitimate documents (pro-forma invoices, commercial invoices, packing list, LC docs, BL, etc.) that are uploaded will be removed and are considered a violation of Shipgrid's Code of Conduct.
              </div>
            </div>
          </Space>
        </div>
      </Drawer>
    </>
  );
}

export default AboutMoreDrawer
