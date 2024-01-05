import React, { useState } from 'react';
import { 
  Button, 
  Modal 
} from 'antd';

import DocumentUpload from './DocumentUpload';

interface AddDocumentModalProps {
  orderId: string;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  orderId
}) => {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button style={{marginBottom: 5 }} onClick={showModal}>
        Add Document
      </Button>
      <Modal
        title="Create Document"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <DocumentUpload
          orderId={orderId}
        />
      </Modal>
    </>
  );
};

export default AddDocumentModal;