
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  getPresignedUrls 
} from '../services/vendors/aws.service'

const getPresignedUrlsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  console.log('hit register', req.body)

  try {
    const {
      file
    } = req.body

    const presignedUrls = await getPresignedUrls({ file })

    res.status(200).json({ success: true, data: presignedUrls });
  } catch (e) {
    console.log('err:', e)
    next(e)
  }
}

export {
  getPresignedUrlsController
}