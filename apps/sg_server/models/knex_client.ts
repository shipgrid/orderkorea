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

export default knex;