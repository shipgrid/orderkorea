import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Door {
  door_id: number; 
  name: string;
  count: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Door extends Model implements Door {
  static get tableName() {
    return 'doors'; 
  }

  static get idColumn() {
    return 'door_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'doors.door_id',
          to: 'vehicles.door_id',
        },
      }
    };
  }


  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'count'
      ],
      properties: {
        door_id: { type: 'integer' },
        name: { type: 'string' },
        count: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Door;
