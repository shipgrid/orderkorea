import { Model } from 'objection';
import knexClient from './knex_client';
import Sku from './sku';
import Shipment from './shipment';
import Location from './location';

Model.knex(knexClient);

interface Inventory {
  inventory_id: number;
  sku_id: string;
  shipment_id: number;
  location_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Inventory extends Model implements Inventory {
  static get tableName() {
    return 'inventory';
  }

  static get idColumn() {
    return 'inventory_id';
  }

  static get relationMappings() {
    return {
      sku: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sku,
        join: {
          from: 'inventory.sku_id',
          to: 'skus.sku_id'
        }
      },
      shipment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shipment,
        join: {
          from: 'inventory.shipment_id',
          to: 'shipments.shipment_id'
        }
      },
      location: {
        relation: Model.BelongsToOneRelation,
        modelClass: Location,
        join: {
          from: 'inventory.location_id',
          to: 'locations.location_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['sku_id', 'shipment_id', 'location_id'],
      properties: {
        inventory_id: { type: 'integer' },
        sku_id: { type: 'string', maxLength: 255 },
        shipment_id: { type: 'integer' },
        location_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Inventory;
