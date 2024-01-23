import { Model } from 'objection';
import knexClient from './knex_client'
import Make from './make'
import Vehicle from './vehicle'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface VehicleModel {
  model_id: number; 
  make_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class VehicleModel extends Model implements VehicleModel {
  static get tableName() {
    return 'models'; 
  }

  static get idColumn() {
    return 'model_id';
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.BelongsToOneRelation,
        modelClass: Make,
        join: {
          from: 'models.make_id',
          to: 'make.make_id',
        },
      },
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'models.model_id',
          to: 'vehicles.model_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'make_id',
        'name' 
      ],
      properties: {
        model_id: { type: 'integer' },
        make_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default VehicleModel;
