import { Model } from 'objection';
import knexClient from './knex_client';
import Warehouse from './warehouse';

Model.knex(knexClient);

interface Location {
  location_id: number;
  location_code: string;
  warehouse_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Location extends Model implements Location {
  static get tableName() {
    return 'locations';
  }

  static get idColumn() {
    return 'location_id';
  }

  static get relationMappings() {
    return {
      warehouse: {
        relation: Model.BelongsToOneRelation,
        modelClass: Warehouse,
        join: {
          from: 'locations.warehouse_id',
          to: 'warehouses.warehouse_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['location_code', 'warehouse_id'],
      properties: {
        location_id: { type: 'integer' },
        location_code: { type: 'string', maxLength: 255 },
        warehouse_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Location;
