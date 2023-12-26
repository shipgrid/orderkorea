import Joi from 'joi'

import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import {
  HttpError
} from '../../models'

import { 
  orders 
} from '../../services'

import getVendorNameByProductUrl from '../../utils/url/get_vendor_name_by_product_url'

const createPurchaseOrder = Joi.object({
  customer_id: Joi.number().required(),
  description: Joi.string().required(),
  product_url: Joi.string().required(),
  quantity: Joi.number().required(),
})

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const { error } = createPurchaseOrder.validate(req.body)
    
    console.log('errorr!!!', error)
    if (error) {
      throw new HttpError(400, error.details[0].message)
    }

    const {
      customer_id, 
      description, 
      product_url, 
      quantity
    } = req.body

    const vendorName = getVendorNameByProductUrl(product_url)

    console.log(vendorName)

    const productName = vendorName + description 

    const data = await orders.createPurchaseOrder({
      name: productName,
      description,
      product_url,
      quantity,
      customer_id
    })

    res.status(200).json({ message: 'Purchase Order Created Successfully', data });
  } catch (e) {
    next(e)
  }
}