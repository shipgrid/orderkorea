import { Model } from 'objection';
import Knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Initialize knex.
const knex = Knex({
  client: 'mysql2',
  useNullAsDefault: true,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    multipleStatements: true,
    dateStrings: true,
    timezone: 'Z'
  },
  pool: { min: 0, max: 7 }
});

Model.knex(knex);

class User extends Model {
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

export {
  User
};
