import Joi from 'joi'

import {
  Logger, 
  Sku,
  HttpError
} from '../../models'

const getSkuById = Joi.object({
  sku_id: Joi.string().required()
})


export default async ({
  sku_id
}) => {

  try {

    const { error } = getSkuById.validate({ sku_id });
    
    if (error) {
      throw new HttpError(400, error.details[0].message);
    }

    const skuData = await Sku.query()
    .where('sku_id', sku_id)
    
    return skuData[0]
  } catch(e) {
    Logger.error('Error getting order:', e);
    throw e;
  }
}