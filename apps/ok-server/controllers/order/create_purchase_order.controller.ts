
import { 
  Request, 
  Response, 
  NextFunction 
} from 'express'

import { 
  orders 
} from '../../services'
import getVendorNameByProductUrl from '../../utils/url/get_vendor_name_by_product_url'

export default async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    const {
      description, 
      productUrl, 
      quantity
    } = req.body

    const vendorName = getVendorNameByProductUrl(productUrl)

    console.log(vendorName)

    const productName = vendorName + description 



    // await orders.createPurchaseOrder({
    //   first_name,
    //   last_name,
    //   username,
    //   password,
    // })

    res.status(200).json({ message: 'Purchase Order Created Successfully'});
  } catch (e) {
    next(e)
  }
}