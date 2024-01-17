import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'

Model.knex(knexClient);

interface Color {
  color_id: number; 
  name: string;
  code: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Color extends Model implements Color {
  static get tableName() {
    return 'colors'; 
  }

  static get idColumn() {
    return 'color_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'colors.color_id',
          to: 'vehicles.color_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
        'code'
      ],
      properties: {
        color_id: { type: 'integer' },
        name: { type: 'string' },
        code: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Color;
