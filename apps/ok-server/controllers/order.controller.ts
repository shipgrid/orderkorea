
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  createPurchaseOrder,
  getOrder
} from '../services/order.service'

const purchaseOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      sku_id, 
      name,
      description,
      unit_price,
      product_url,
      quantity,
      type,
      customer_id
    } = req.body

    const order = await createPurchaseOrder({
      sku_id, 
      name,
      description,
      unit_price,
      product_url,
      quantity,
      type,
      customer_id
    })

    res.status(200).json({ success: true, order_id: order.order_id });
  } catch (e) {
    next(e)
  }
}

const getOrdersByCustomerId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      customer_id
    } = req.params

    const orders = await getOrder({
      customer_id
    })
    console.log(orders)
    res.status(200).json({ success: true, });
  } catch (e) {
    next(e)
  }

}

export {
  purchaseOrder,
  getOrdersByCustomerId
}