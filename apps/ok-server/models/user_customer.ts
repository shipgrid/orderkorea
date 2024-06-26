import { Model } from 'objection';
import User from './user'
import knexClient from './knex_client'

Model.knex(knexClient);

interface UserCustomer {
  customer_id: number;
  user_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null; // Assuming deleted_on can be null
}

class UserCustomer extends Model implements UserCustomer {
  static get tableName() {
    return 'user_customers';
  }

  static get idColumn() {
    return 'customer_id';
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'user_customers.user_id',
          to: 'users.user_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id'],
      properties: {
        customer_id: { type: 'integer' },
        user_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default UserCustomer;
