import { 
  Request, 
  Response, 
  NextFunction
} from 'express'

import {
  orders
} from '../../services'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      order_id,
      shipment_type,
      container_number,
      port_of_loading,
      port_of_arrival, 
      loaded_on
    } = req.body

    const data = await orders.update({
      order_id,
      shipment_type,
      container_number,
      port_of_loading,
      port_of_arrival, 
      loaded_on
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
