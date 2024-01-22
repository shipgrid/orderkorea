import {
  Logger,
  Reservation
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  
}): Promise<IServiceResponse<Reservation[]>> => {

  return new Promise(async (resolve, reject) => {
    try {
      
      const reservations = await Reservation
        .query()
        .joinRelated('vehicle')
        .withGraphFetched('vehicle.[make(selectMake)]')
        .withGraphFetched('vehicle.[model(selectModel)]')
        .withGraphFetched('vehicle.[trim(selectTrim)]')
        .withGraphFetched('vehicle.[body_style(selectBodyStyle)]')
        .withGraphFetched('vehicle.[fuel_type(selectFuelType)]')
        .withGraphFetched('vehicle.[doors(selectDoors)]')
        .withGraphFetched('vehicle.[exterior_color(selectColor)]')
        .withGraphFetched('vehicle.[interior_color(selectColor)]')
        .withGraphFetched('vehicle.[transmission(selectTransmission)]')
        .withGraphFetched('vehicle.[drivetrain(selectDrivetrain)]')
        .withGraphFetched('vehicle.[cylinders(selectCylinder)]')
        .withGraphFetched('vehicle.[fees(selectFees)]')
        .withGraphFetched('vehicle.[images(selectImages)]')
        .modifyGraph('vehicle', builder => {
          builder.select('vehicle_id', 'year', 'mileage', 'is_new', 'vin_number', 'description', 'created_on', 'updated_on', 'deleted_on')
        })
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
        .select(
          'reservation_id',
          'order_id',
          'customer_id',
        )
        .where('order_id', null)
        .orderBy('reservations.created_on', 'desc')

      resolve({
        success: true, 
        data: reservations
      })

    } catch(e) {
      Logger.error('Error getting vehicle by id:', e);
      reject(e)
    }
  });
}
