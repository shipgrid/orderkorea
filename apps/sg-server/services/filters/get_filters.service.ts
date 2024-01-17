import {
  Logger,
  Make,
  Model,
  Trim,
  FuelType,
  BodyStyle,
  Transmission,
  Door,
  Color,
  Drivetrain, 
  Cylinder
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  makesFilter,
  modelFilter,
  price,
  mileage,
  years
}: {
  makesFilter: string[],
  modelFilter: string[],
  price: string[],
  mileage: string[],
  years: string[]

}): Promise<IServiceResponse<{
  makes: Make[],
  models?: Model[],
  trims?: Trim[],
  fuel_types: FuelType[],
  body_styles: BodyStyle[],
  transmissions: Transmission[],
  doors: Door[],
  colors: Color[],
  drivetrains: Drivetrain[], 
  cylinders: Cylinder[]
}>> => {

  if(!makesFilter.length) {
    modelFilter = [];
  }

  return new Promise(async (resolve, reject) => {
    try {
      const makes = await Make
        .query()
        .select('make_id', 'name');

      let modelsQuery = Model
        .query()
        .select('models.model_id', 'models.make_id', 'models.name')
        .join('makes', 'models.make_id', 'makes.make_id')
        .whereIn('makes.name', makesFilter);

      const models = await modelsQuery;

      let trimsQuery = Trim
        .query()
        .select('trims.trim_id', 'trims.model_id', 'trims.name')
        .join('models', 'trims.model_id', 'models.model_id')
        .whereIn('models.name', modelFilter);

      const trims = await trimsQuery;

      const fuelTypes = await FuelType
        .query()
        .select('fuel_type_id', 'name', 'green');

      const bodyStyles = await BodyStyle
        .query()
        .select('body_style_id', 'name');
      
      const transmissions = await Transmission 
        .query()
        .select('transmission_id', 'name');

      const doors = await Door  
        .query()
        .select('door_id', 'name', 'count');

      const colors = await Color 
        .query()
        .select('color_id', 'name', 'code');
      
      const drivetrains = await Drivetrain 
        .query()
        .select('drivetrain_id', 'name');

      const cylinders = await Cylinder
        .query()
        .select('cylinder_id', 'name') 


      resolve({
        success: true, 
        data: {
          makes, 
          models, 
          trims, 
          fuel_types: fuelTypes, 
          body_styles: bodyStyles, 
          transmissions, 
          doors, 
          colors,
          drivetrains, 
          cylinders
        }
      })

    } catch(e) {
      Logger.error('Error getting orders:', e);
      reject(e)
    }
  })
}