
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  uploadFileToS3 
} from '../../services/vendors/aws.service'

const uploadDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    console.log('req file:', req.file)
    const {
      file
    } = req

    if (!file) {
      throw new Error('Please provide a valid file to upload')
    }

    await uploadFileToS3({ file })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}

export default uploadDocumentController