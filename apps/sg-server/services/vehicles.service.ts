import Vehicle from '../models/vehicles'
import logger from '../models/logger'
import knexClient from '../models/knex_client'

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

const getVehicleById = async ({
  vehicle_id
}) => {
  try {
    const vehicle = await Vehicle.query().findById(vehicle_id);

    if(!vehicle) {
      throw new Error('Vehicle not found');
    }

    return vehicle;
  } catch(e) {
    logger.error('Error getting vehicle by id:', e);
    throw e
  }
}

const createVehicle = async ({
  make,
  model,
  year,
  exterior_color,
  transmission_type,
  mileage,
  description
}) => {
  try {

    let createdVehicle;

    await knexClient.transaction(async (trx) => {

      const newVehicle = {
        make,
        model,
        year,
        exterior_color,
        transmission_type,
        mileage,
        description
      };

      const vehicle = await Vehicle.query(trx).insert(newVehicle);
      createdVehicle = vehicle;
      await trx.commit();
      
      logger.info('Vehicle created:', vehicle);
    });

    return createdVehicle

  } catch(e) {
    logger.error('Error creating vehicle:', e);
    throw e
  }
}

const deleteVehicle = async ({
  vehicle_id
}) => {
  try {
    await knexClient.transaction(async (trx) => {

      const vehicle = await Vehicle.query(trx).deleteById(vehicle_id);

      await trx.commit();

      logger.info('Vehicle deleted:', vehicle);
    });
  } catch(e) {
    logger.error('Error deleting vehicle:', e);
    throw e
  }
}

const updateVehicle = async ({
  vehicle_id,
  make,
  model,
  year,
  exterior_color,
  transmission_type,
  mileage,
  description
}) => {
  try {

    let vehicle; 

    await knexClient.transaction(async (trx) => {

      vehicle = await Vehicle.query(trx).patchAndFetchById(vehicle_id, {
        make,
        model,
        year,
        exterior_color,
        transmission_type,
        mileage,
        description
      });

      await trx.commit();

      logger.info('Vehicle updated:', vehicle);
    });

    return vehicle;
  } catch(e) {
    logger.error('Error updating vehicle:', e);
    throw e
  } 
}

export {
  getVehicles,
  createVehicle,
  deleteVehicle,
  updateVehicle,
  getVehicleById
}