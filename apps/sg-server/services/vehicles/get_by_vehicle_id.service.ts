import {
  Logger,
  Vehicle,
} from '../../models'

export default async ({
  vehicle_id
}) => {
  try {
    const vehicle = await Vehicle
      .query()
      .findById(vehicle_id)
      .withGraphFetched('images');

    if(!vehicle) {
      throw new Error('Vehicle not found');
    }

    return vehicle;
  } catch(e) {
    Logger.error('Error getting vehicle by id:', e);
    throw e
  }
}
