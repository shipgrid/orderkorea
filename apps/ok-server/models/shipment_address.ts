import { Model } from 'objection';
import knexClient from './knex_client';

Model.knex(knexClient);

interface ShipmentAddress {
  shipment_address_id: number;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state_code: string;
  country_code: string;
  postal_code: string;
  email: string;
  phone: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class ShipmentAddress extends Model implements ShipmentAddress {
  static get tableName() {
    return 'shipment_addresses';
  }

  static get idColumn() {
    return 'shipment_address_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        shipment_address_id: { type: 'integer' },
        name: { type: 'string', maxLength: 255 },
        line1: { type: 'string', maxLength: 255 },
        line2: { type: 'string', maxLength: 255 },
        city: { type: 'string', maxLength: 255 },
        state_code: { type: 'string', maxLength: 255 },
        country_code: { type: 'string', maxLength: 255 },
        postal_code: { type: 'string', maxLength: 255 },
        email: { type: 'string', maxLength: 255 },
        phone: { type: 'string', maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default ShipmentAddress;
