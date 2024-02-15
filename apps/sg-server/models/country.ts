import { Model } from 'objection';
import knexClient from './knex_client'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Country {
  country_id: number; 
  name: string;
  code: string;
  dial_code: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Country extends Model implements Country {
  static get tableName() {
    return 'countries'; 
  }

  static get idColumn() {
    return 'country_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'code',
        'dial_code'
      ],
      properties: {
        country_id: { type: 'integer' },
        code: { type: 'string' },
        dial_code: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Country;
