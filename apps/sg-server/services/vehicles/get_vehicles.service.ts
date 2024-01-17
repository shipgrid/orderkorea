import {
  Logger,
  Vehicle,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
}): Promise<IServiceResponse<Vehicle[]>> => {

  return new Promise(async (resolve, reject) => {
    
    try {

      const vehicles = await Vehicle
        .query()
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
        .withGraphFetched('images')
        .modifyGraph('images', builder => {
          builder.select('image_url');
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
          }
        })
        .select(
          'vehicle_id',
          'year',
          'vin_number',
          'is_new',
          'price',
          'mileage')

      resolve({
        success: true,
        data: vehicles
      })
    
    } catch(e) {
      Logger.error('Error:', e);
      reject(e)
    }
  })
}