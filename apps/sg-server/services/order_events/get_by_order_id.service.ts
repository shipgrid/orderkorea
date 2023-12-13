import {
  Logger,
  OrderEvent
} from '../../models'

export default async ({}) => {

  try {
    const orderEvents = await OrderEvent.query();
    return orderEvents;
  } catch(e) {
    Logger.error('Error getting user by username:', e);
    throw e
  }
}