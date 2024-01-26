import {
  Logger,
  Vehicle,
} from '../../models'

import {
  IServiceResponse
} from '../../types'

export default async ({
  searchFilter,
  conditionsFilter,
  makesFilter,
  modelFilter,
  trimFilter,
  priceFilter,
  mileageFilter,
  yearsFilter,
  sortFilter
}: {
  searchFilter: string[],
  conditionsFilter: string[],
  makesFilter: string[],
  modelFilter: string[],
  trimFilter: string[],
  priceFilter: string[],
  mileageFilter: string[],
  yearsFilter: string[],
  sortFilter: string[]
}): Promise<IServiceResponse<Vehicle[]>> => {

  return new Promise(async (resolve, reject) => {

    try {
      const vehiclesQuery = Vehicle
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
        .withGraphFetched('images(selectImages)')
        .withGraphFetched('cylinders(selectCylinder)')
        .withGraphFetched('fees(selectFees)')
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
          'year',
          'vin_number',
          'is_new',
          'mileage',
          'vehicles.created_on',
          'vehicles.updated_on',
          'vehicles.deleted_on'
        )

        if(searchFilter.length) {
          const keyword = searchFilter[0];
          vehiclesQuery
            .where('make.name', 'like', `%${keyword}%`)
            .orWhere('model.name', 'like', `%${keyword}%`)
            .orWhere('year', 'like', `%${keyword}%`)
            .orWhere('vin_number', 'like', `%${keyword}%`)
        }

        if(sortFilter.length) {
          if(sortFilter.includes('highest-price')) {
            vehiclesQuery.orderBy('fees.vehicle_price', 'desc')
          }

          if(sortFilter.includes('lowest-price')) {
            vehiclesQuery.orderBy('fees.vehicle_price', 'asc')
          }

          if(sortFilter.includes('lowest-mileage')) {
            vehiclesQuery.orderBy('mileage', 'asc')
          }

          if(sortFilter.includes('newest')) {
            vehiclesQuery.orderByRaw('CAST(year AS SIGNED) DESC')
          }

          if(sortFilter.includes('oldest')) {
            vehiclesQuery.orderByRaw('CAST(year AS SIGNED) ASC')
          }
        }

        if (conditionsFilter.length) {
          const conditions = conditionsFilter.map((condition) => {
            if (condition === 'New') {
              return 1;
            } else if (condition === 'Used') {
              return 0;
            }
          })

          vehiclesQuery.whereIn('is_new', conditions as any);
        }

        if (makesFilter.length) {
          vehiclesQuery.whereIn('make.name', makesFilter);
        }

        if(modelFilter.length) {
          vehiclesQuery.whereIn('model.name', modelFilter)
        }

        if(trimFilter.length) {
          vehiclesQuery.whereIn('trim.name', trimFilter)
        }

        if(priceFilter.length > 1) {
          vehiclesQuery.whereBetween('fees.vehicle_price', [priceFilter[0], priceFilter[1]])
        }

        if(mileageFilter.length > 1) {
          vehiclesQuery.whereBetween('mileage', [mileageFilter[0], mileageFilter[1]])
        }

        if(yearsFilter.length > 1) {
          vehiclesQuery.whereBetween('year', [yearsFilter[0], yearsFilter[1]])
        }

      const vehicles = await vehiclesQuery;
    
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