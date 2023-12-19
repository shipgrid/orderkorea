import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import DocumentUpload from './DocumentUpload';

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <DocumentUpload/>
      </Modal>
    </>
  );
};

export default App;