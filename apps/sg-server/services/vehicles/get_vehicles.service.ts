import {
  Logger,
  Vehicle,
} from '../../models'

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
    Logger.error('Error getting user by username:', e);
    throw e
  }
}