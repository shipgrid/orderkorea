
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  uploadFileToS3 
} from '../../services/vendors/aws.service'

import {
  documents
} from '../../services'


const uploadDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    
    const {
      file,
      order_id
    } = req

    if (!file) {
      throw new Error('Please provide a valid file to upload')
    }

    const document_url = await uploadFileToS3({ file })

    const data = await documents.create({
      order_id,
      document_url
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

export default uploadDocumentController