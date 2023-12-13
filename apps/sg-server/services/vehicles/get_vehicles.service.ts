import Vehicle from '../../models/vehicle'
import logger from '../../models/logger'

export default async ({
}) => {

  try {
    const vehicles = await Vehicle
      .query()
      .withGraphFetched('images')
      .modifyGraph('images', builder => {
        builder.select('image_url');
      })
    return vehicles;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}