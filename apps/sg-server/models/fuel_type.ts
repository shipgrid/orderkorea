import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle';

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface FuelType {
  fuel_type_id: number; 
  name: string;
  green: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class FuelType extends Model implements FuelType {
  static get tableName() {
    return 'fuel_types'; 
  }

  static get idColumn() {
    return 'trim_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'fuel_types.fuel_type_id',
          to: 'vehicles.fuel_type_id',
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
        fuel_type_id: { type: 'integer' },
        name: { type: 'string' },
        green: { type: 'boolean' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default FuelType;
