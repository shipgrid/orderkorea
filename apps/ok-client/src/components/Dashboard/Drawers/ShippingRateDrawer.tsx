import React, { 
  useState 
} from 'react';

import { 
  Button, 
  Drawer, 
  Space, 
} from 'antd';

import { 
  RiShipLine,
  RiSave3Line
} from "react-icons/ri";

import ShippingRates from '../ShippingCalculator/ShippingRates';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer} icon={<RiShipLine />}>
        Shipping Options
      </Button>
      <Drawer
        title="Get Shipping Rates"
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} icon={<RiSave3Line />}>
              Save
            </Button>
          </Space>
        }
      >
      <ShippingRates/>
      </Drawer>
    </>
  );
};

export default App;