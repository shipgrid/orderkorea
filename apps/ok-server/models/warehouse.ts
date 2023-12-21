import { Model } from 'objection';
import knexClient from './knex_client';
import Address from './address';

Model.knex(knexClient);

interface Warehouse {
  warehouse_id: number;
  address_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Warehouse extends Model implements Warehouse {
  static get tableName() {
    return 'warehouses';
  }

  static get idColumn() {
    return 'warehouse_id';
  }

  static get relationMappings() {
    return {
      address: {
        relation: Model.BelongsToOneRelation,
        modelClass: Address,
        join: {
          from: 'warehouses.address_id',
          to: 'addresses.address_id'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['address_id'],
      properties: {
        warehouse_id: { type: 'integer' },
        address_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] }
      }
    };
  }
}

export default Warehouse;
