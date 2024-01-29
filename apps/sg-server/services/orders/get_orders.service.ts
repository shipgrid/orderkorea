import {
  Logger,
  Order,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  user_id
}): Promise<IServiceResponse<Order[]>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const orders = await Order
        .query()
        .withGraphFetched('orderEvents')
        .withGraphFetched('thirdParties.[address]')
        .withGraphFetched('documents')
        .withGraphFetched('vehicles.[images]')
        .withGraphFetched('seller(selectSeller)')
        .withGraphFetched('buyer(selectBuyer)')
        .withGraphFetched('vehicles.[make(selectMake)]')
        .withGraphFetched('vehicles.[model(selectModel)]')
        .withGraphFetched('vehicles.[trim(selectTrim)]')
        .withGraphFetched('vehicles.[body_style(selectBodyStyle)]')
        .withGraphFetched('vehicles.[fuel_type(selectFuelType)]')
        .withGraphFetched('vehicles.[doors(selectDoors)]')
        .withGraphFetched('vehicles.[exterior_color(selectColor)]')
        .withGraphFetched('vehicles.[interior_color(selectColor)]')
        .withGraphFetched('vehicles.[transmission(selectTransmission)]')
        .withGraphFetched('vehicles.[drivetrain(selectDrivetrain)]')
        .withGraphFetched('vehicles.[cylinders(selectCylinder)]')
        .withGraphFetched('vehicles.[fees(selectFees)]')
        .withGraphFetched('vehicles.[images(selectImages)]')
        .modifiers({
          selectBuyer(builder) {
            builder.select('username', 'first_name', 'last_name')
          },
          selectSeller(builder) {
            builder.select('username', 'first_name', 'last_name')
          },
          selectMake(builder) {
            builder.select('make_id', 'name')
          },
          selectModel(builder) {
            builder.select('make_id', 'model_id', 'name')
          },
          selectTrim(builder) {
            builder.select('trim_id', 'model_id', 'name')
          },
          selectBodyStyle(builder) {
            builder.select('body_style_id', 'name')
          },
          selectFuelType(builder) {
            builder.select('fuel_type_id', 'name')
          },
          selectDoors(builder) {
            builder.select('door_id', 'name', 'count')
          },
          selectColor(builder) {
            builder.select('color_id', 'name', 'code')
          },
          selectTransmission(builder) {
            builder.select('transmission_id', 'name')
          },
          selectDrivetrain(builder) {
            builder.select('drivetrain_id', 'name')
          },
          selectImages(builder) {
            builder.select('image_url')
          },
          selectCylinder(builder) {
            builder.select('cylinder_id', 'name')
          },
          selectFees(builder) {
            builder.select('fee_id', 'vehicle_price', 'delivery_fee', 'service_fee', 'deposit_fee')
          }
        })
        .where('seller_id', user_id)
        .orWhere('buyer_id', user_id); 
        
      resolve({
        success: true, 
        data: orders
      })

    } catch(e) {
      Logger.error('Error getting orders:', e);
      reject(e)
    }
  })
}