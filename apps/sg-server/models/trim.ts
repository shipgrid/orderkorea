import { Model } from 'objection';
import knexClient from './knex_client'
import VehicleModel from './model'
import Vehicle from './vehicle';

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Trim {
  trim_id: number; 
  model_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Trim extends Model implements Trim {
  static get tableName() {
    return 'trims'; 
  }

  static get idColumn() {
    return 'trim_id';
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.BelongsToOneRelation,
        modelClass: VehicleModel,
        join: {
          from: 'trims.model_id',
          to: 'models.model_id',
        },
      },
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'trims.trim_id',
          to: 'vehicles.trim_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'model_id',
        'name' 
      ],
      properties: {
        trim_id: { type: 'integer' },
        model_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Trim;
