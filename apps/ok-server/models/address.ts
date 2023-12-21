import { Model } from 'objection';
import knexClient from './knex_client';
import Customer from './user_customer'; // Assuming you have a Customer model

Model.knex(knexClient);

interface Address {
  address_id: number;
  name: string;
  line1: string;
  line2: string;
  city: string;
  state_code: string;
  country_code: string;
  postal_code: string;
  email: string;
  phone: string;
  customer_id: number | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Address extends Model implements Address {
  static get tableName() {
    return 'addresses';
  }

  static get idColumn() {
    return 'address_id';
  }

  static get relationMappings() {
    return {
      customer: {
        relation: Model.BelongsToOneRelation,
        modelClass: Customer,
        join: {
          from: 'addresses.customer_id',
          to: 'customers.customer_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        address_id: { type: 'integer' },
        name: { type: 'string', maxLength: 255 },
        line1: { type: 'string', maxLength: 255 },
        line2: { type: 'string', maxLength: 255 },
        city: { type: 'string', maxLength: 255 },
        state_code: { type: 'string', maxLength: 45 },
        country_code: { type: 'string', maxLength: 2 },
        postal_code: { type: 'string', maxLength: 45 },
        email: { type: 'string', maxLength: 255 },
        phone: { type: 'string', maxLength: 255 },
        customer_id: { type: ['integer', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Address;
