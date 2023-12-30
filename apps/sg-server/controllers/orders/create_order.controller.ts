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
    const customer = req.customer

    const {
        email,
        shipment_type,
        port_of_loading,
        container_number,
        port_of_arrival,
        loaded_on,
        thirdParties,
        documents,
        vehicles
    } = req.body
    
    const data = await orders.create({
      email,
      shipment_type,
      port_of_loading,
      container_number,
      port_of_arrival,
      loaded_on,
      thirdParties,
      documents,
      vehicles
    })

    res.status(200).json({ data, success: true });
  } catch (e) {
    next(e)
  }
}
