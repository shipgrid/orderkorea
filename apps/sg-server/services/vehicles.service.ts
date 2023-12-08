import Vehicle from '../models/vehicles'
import logger from '../models/logger'

const getVehicles = async ({

}) => {

  try {
    const vehicles = await Vehicle.query();

    if(!vehicles) {
      throw new Error('User not found');
    }

    return vehicles;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}

export {
  getVehicles
}