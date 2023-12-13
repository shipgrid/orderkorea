import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  getOrders,
  createOrder,
  deleteOrder,
  getOrderById,
  uploadDocument
} from '../services/order.service'

const getOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const orders = await getOrders({})

    res.status(200).json({ data: orders, success: true });
  } catch (e) {
    next(e)
  }
}

const getOrderByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      order_id
    } = req.params
    
    const data = await getOrderById({
      order_id
    })
    console.log(data)
    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      vehicle_id,
      customer_id 
    } = req.body
    
    const data = await createOrder({
      vehicle_id,
      customer_id 
    })

    res.status(200).json({ data: data, success: true });
  } catch (e) {
    next(e)
  }
}

const deleteOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const {
      order_id
    } = req.body
    
    const data = await deleteOrder({
      order_id
    })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}

const uploadDocumentController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    console.log('upload doc controller req', req)
    // const {
    //   document_url
    // } = req.body
    
    // const data = await uploadDocument({
    //   order_id
    // })

    res.status(200).json({ success: true });
  } catch (e) {
    next(e)
  }
}
export {
  getOrdersController,
  createOrderController,
  deleteOrderController,
  getOrderByIdController,
  uploadDocumentController
}