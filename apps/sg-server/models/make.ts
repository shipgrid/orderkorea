import { Model } from 'objection';
import knexClient from './knex_client'
import VehicleModel from './model'
import Vehicle from './vehicle'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Make {
  make_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Make extends Model implements Make {
  static get tableName() {
    return 'makes'; 
  }

  static get idColumn() {
    return 'make_id';
  }

  static get relationMappings() {
    return {
      vehicles: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'makes.make_id',
          to: 'vehicles.make_id',
        },
      },
      models: {
        relation: Model.HasManyRelation,
        modelClass: VehicleModel,
        join: {
          from: 'makes.make_id',
          to: 'models.make_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name', 
      ],
      properties: {
        make_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Make;
