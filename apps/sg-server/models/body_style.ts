import { Model } from 'objection';
import knexClient from './knex_client';
import Vehicle from './vehicle';

Model.knex(knexClient);

interface BodyStyle {
  body_style_id: number; 
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class BodyStyle extends Model implements BodyStyle {
  static get tableName() {
    return 'body_styles'; 
  }

  static get idColumn() {
    return 'body_style_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'body_styles.body_style_id',
          to: 'vehicles.body_style_id',
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
        body_style_id: { type: 'integer' },
        name: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default BodyStyle;
