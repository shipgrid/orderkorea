import Address from '../models/address';
import KnexClient from '../models/knex_client';
import logger from '../models/logger'

const getAddresses = async ({}) => {

  try {
    const addresses = await Address.query();
    return addresses;
  } catch(e) {
    logger.error('Error getting user by username:', e);
    throw e
  }
}

const getAddressById = async ({
  address_id
}) => {
  try {
    const address = await Address.query().findById(address_id);
    return address;
  } catch(e) {
    logger.error('Error getting address by address_id', e);
    throw e
  }
}

const createAddress = async ({
  name,
  line1,
  line2,
  city,
  state_code,
  country_code,
  postal_code,
  email,
  phone,
  customer_id,
}) => {
  try {

    let createdAddress;

    await KnexClient.transaction(async (trx) => {

      const newAddress = {
        name,
        line1,
        line2,
        city,
        state_code,
        country_code,
        postal_code,
        email,
        phone,
        customer_id,
      };

      const address = await Address.query(trx).insert(newAddress);
      createdAddress = address;
    });

    return createdAddress;
  } catch(e) {
    logger.error('Error creating address:', e);
    throw e
  }
}

const deleteAddress = async ({
  address_id
}) => {
  try {

    await KnexClient.transaction(async (trx) => {

      await Address.query(trx).deleteById(address_id);
    });
  } catch(e) {
    logger.error('Error deleting address:', e);
    throw e
  }
}

const updateAddress = async ({
  address_id,
  name,
  line1,
  line2,
  city,
  state_code,
  country_code,
  postal_code,
  email,
  phone,
  customer_id,
}) => {
  try {

    let updatedAddress;

    await KnexClient.transaction(async (trx) => {

      const newAddress = {
        name,
        line1,
        line2,
        city,
        state_code,
        country_code,
        postal_code,
        email,
        phone,
        customer_id,
      };

      const address = await Address.query(trx).update(newAddress).where('address_id', address_id);
      updatedAddress = address;
    });

    return updatedAddress;
  } catch(e) {
    logger.error('Error updating address:', e);
    throw e
  }
}

export {
  getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,
  getAddressById
}