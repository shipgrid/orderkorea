import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  documents
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      document_id
    } = req.params

    const data = await documents.remove({
      document_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}