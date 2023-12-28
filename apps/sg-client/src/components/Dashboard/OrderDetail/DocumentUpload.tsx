import React from 'react';

import type { 
  UploadProps 
} from 'antd';

import { 
  Upload,
  Spin
} from 'antd';

import {
  useCreateDocumentMutation,
} from '../../../services/api'

const { Dragger } = Upload;

interface DocumentUploadProps {
  orderId: string
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  orderId
}) => {

  const [
    createDocument, { 
      isLoading 
    }
  ] = useCreateDocumentMutation();

  const props: UploadProps = {
    accept: "application/pdf",
    name: 'file',
    multiple: false,
    customRequest: async (options) => { 
      
      const { 
        file, 
        onSuccess, 
        onError 
      } = options

      const fileName = (file as File).name;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', fileName);

      const response = await createDocument({
        order_id: parseInt(orderId),
        file: formData
      })
      
      if ('data' in response) {
        if (onSuccess) {
          onSuccess(response.data);
        }
      } else {
        if (onError) {
          onError(new Error('Something went wrong!'));
        }
      }
    },
  };

  return (
    <Spin spinning={isLoading}>
      <Dragger {...props}>
        <p className="ant-upload-text">Click this area to upload</p>
        <p className="ant-upload-hint">
          Click here to upload
        </p>
      </Dragger>
    </Spin>
  )
};

export default DocumentUpload;