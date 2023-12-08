import React, { 
  useState 
} from 'react';

import { 
  Button, 
  Drawer, 
  Space, 
} from 'antd';

import type { 
  CheckboxChangeEvent 
} from 'antd/es/checkbox';

import { 
  FiPlus 
} from 'react-icons/fi';

import { 
  RiSave3Line 
} from 'react-icons/ri';

import PackingInstructionsForm from '../Forms/PackingInstructionForm';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);

  const onChange = (e: CheckboxChangeEvent) => {
    console.log(`checked = ${e.target.checked}`);
  };  

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={showDrawer} icon={<FiPlus />}>
        Packing Instructions (Optional)
      </Button>
      <Drawer
        title="Review Your Packing Instructions"
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
        <PackingInstructionsForm/>
      </Drawer>
    </>
  );
};

export default App;