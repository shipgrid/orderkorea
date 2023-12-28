import React from 'react';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';
import axios from 'axios'
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

  const [removeThirdParty, { isLoading }] = useCreateDocumentMutation();

  const props: UploadProps = {
    accept: "application/pdf",
    name: 'file',
    multiple: false,
    customRequest: async (options) => { 
      const { file, onSuccess, onError } = options

      const fileName = (file as File).name;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', fileName);

      const response = await removeThirdParty({
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
    <Dragger {...props}>
      <p className="ant-upload-text">Click this area to upload</p>
      <p className="ant-upload-hint">
        Click here to upload
      </p>
    </Dragger>
  )
};

export default DocumentUpload;