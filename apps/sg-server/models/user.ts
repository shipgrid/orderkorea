import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle';

Model.knex(knexClient);


// Define an interface that represents your User model properties
interface User {
  user_id: number;
  first_name: string;
  last_name: string | null;
  username: string;
  password_hash: string;
  last_login: string | null; // Assuming last_login can be null
  is_broker: boolean;
  is_staff: boolean;
  created_on: string;
  updated_on: string;
  deleted_on: string | null; // Assuming deleted_on can be null
}

class User extends Model implements User {
  static get tableName() {
    return 'users'; 
  }

  static get idColumn() {
    return 'user_id';
  }

  static get relationMappings() {
    return {
      vehicles: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'users.user_id',
          to: 'vehicles.user_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'username', 'password_hash'],
      properties: {
        user_id: { type: 'integer' },
        rate_card_id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password_hash: { type: 'string', minLength: 1, maxLength: 255 },
        is_broker: { type: 'boolean' },
        is_staff: { type: 'boolean' },
        last_login: { type: ['string', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default User;
