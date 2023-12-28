import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  firebase
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      success,
      data
    } = await firebase.upload_files({
      file: req.file,
      destination: 'test',
      filename: 'dummy.pdf',
    })

    res.status(200).json({ success, data });
  } catch (e) {
    next(e)
  }
}
