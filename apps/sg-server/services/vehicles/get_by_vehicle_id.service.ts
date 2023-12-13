import Vehicle from '../../models/vehicle'
import logger from '../../models/logger'

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
    logger.error('Error getting vehicle by id:', e);
    throw e
  }
}
