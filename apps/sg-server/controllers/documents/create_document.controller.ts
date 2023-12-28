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

  const customer = req.customer

  try {
    const {
      order_id, 
    } = req.params
    
    const {
      name
    } = req.body

    const { document_id } = await documents.create({
      name: name,
      file: req.file,
      order_id: order_id,
    })

    res.status(200).json({ data: document_id, success: true });
  } catch (e) {
    next(e)
  }
}
