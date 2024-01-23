import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Transmission {
  transmission_id: number; 
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Transmission extends Model implements Transmission {
  static get tableName() {
    return 'transmissions'; 
  }

  static get idColumn() {
    return 'transmission_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'transmission.transmission_id',
          to: 'vehicles.transmission_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
      ],
      properties: {
        transmission_id: { type: 'integer' },
        name: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Transmission;
