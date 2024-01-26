import {
  Logger,
  Order,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  order_id,
  user_id
}): Promise<IServiceResponse<Order>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const order = await Order
        .query()
        .withGraphFetched('orderEvents')
        .withGraphFetched('thirdParties.[address]')
        .withGraphFetched('documents')
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
        // .modifyGraph('vehicles', builder => {
        //   builder.select('vehicles.vehicles_id', 'year', 'mileage', 'is_new', 'vin_number', 'description', 'created_on', 'updated_on', 'deleted_on')
        // })
        .modifiers({
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
        .where('order_id', order_id)
        .where('buyer_id', user_id)
        .orWhere('seller_id', user_id)
  
        if(!order.length) {
          resolve({
            success: false,
            message: 'Order not found'
          })
          return;
        }
  
      resolve({
        success: true,
        data: order[0]
      })
  
    } catch(e) {
      Logger.error('Error getting order by order_id', e);
      reject(e)
    }
  })
}
