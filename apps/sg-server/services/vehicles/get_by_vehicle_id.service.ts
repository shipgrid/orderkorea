import {
  Logger,
  Vehicle,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  vehicle_id
}): Promise<IServiceResponse<Vehicle>> => {

  return new Promise(async (resolve, reject) => {
    try {
      const vehicle = await Vehicle
        .query()
        .joinRelated('exterior_color')
        .joinRelated('interior_color')
        .joinRelated('make')
        .joinRelated('model')
        .joinRelated('trim')
        .joinRelated('body_style')
        .joinRelated('fuel_type')
        .joinRelated('transmission')
        .joinRelated('drivetrain')
        .joinRelated('doors')
        .joinRelated('cylinders')
        .joinRelated('fees')
        .withGraphFetched('make(selectMake)')
        .withGraphFetched('model(selectModel)')
        .withGraphFetched('trim(selectTrim)')
        .withGraphFetched('body_style(selectBodyStyle)')
        .withGraphFetched('fuel_type(selectFuelType)')
        .withGraphFetched('doors(selectDoors)')
        .withGraphFetched('exterior_color(selectColor)')
        .withGraphFetched('interior_color(selectColor)')
        .withGraphFetched('transmission(selectTransmission)')
        .withGraphFetched('drivetrain(selectDrivetrain)')
        .withGraphFetched('cylinders(selectCylinder)')
        .withGraphFetched('fees(selectFees)')
        .withGraphFetched('images(selectImages)')
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
          'vehicle_id',
          'user_id',
          'order_id',
          'year',
          'vin_number',
          'is_new',
          'mileage',
          'vehicles.created_on',
          'vehicles.updated_on',
          'vehicles.deleted_on'
        )
        .findById(vehicle_id)
  
      if(!vehicle) {
        resolve({
          success: false, 
          message: 'Vehicle not found'
        })

        return;
      }
  
      resolve({
        success: true, 
        data: vehicle
      })

    } catch(e) {
      Logger.error('Error getting vehicle by id:', e);
      reject(e)
    }
  });
}
