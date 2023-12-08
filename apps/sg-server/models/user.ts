import { Model } from 'objection';
import knexClient from './knex_client'

Model.knex(knexClient);

// Define an interface that represents your User model properties
interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  username: string;
  password_hash: string;
  last_login: string | null; // Assuming last_login can be null
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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'username', 'password_hash'],

      properties: {
        user_id: { type: 'integer' },
        rate_card_id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        username: { type: 'string', minLength: 1, maxLength: 255 },
        password_hash: { type: 'string', minLength: 1, maxLength: 255 },
        last_login: { type: ['string', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default User;
