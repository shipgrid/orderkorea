import { Model } from 'objection';
import knexClient from './knex_client';

Model.knex(knexClient);

interface Fee {
  fee_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Fee extends Model implements Fee {
  static get tableName() {
    return 'fees';
  }

  static get idColumn() {
    return 'fee_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        fee_id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Fee;
