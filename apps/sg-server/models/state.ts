import { Model } from 'objection';
import knexClient from './knex_client'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface State {
  state_id: number; 
  name: string;
  code: string;
  country_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class State extends Model implements State {
  static get tableName() {
    return 'states'; 
  }

  static get idColumn() {
    return 'state_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'code',
        'name',
        'country_id'
      ],
      properties: {
        state_id: { type: 'integer' },
        name: { type: 'string' },
        code: { type: 'string' },
        country_id: { type: 'number' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default State;
