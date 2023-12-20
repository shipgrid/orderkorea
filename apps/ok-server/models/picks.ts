import { Model } from 'objection';
import knexClient from './knex_client';
import Inventory from './inventory';
import PickingOrderManifest from './picking_order_manifest';

Model.knex(knexClient);

interface Pick {
  pick_id: number;
  inventory_id: number;
  picking_order_manifest_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Pick extends Model implements Pick {
  static get tableName() {
    return 'picks';
  }

  static get idColumn() {
    return 'pick_id';
  }

  static get relationMappings() {
    return {
      inventory: {
        relation: Model.BelongsToOneRelation,
        modelClass: Inventory,
        join: {
          from: 'picks.inventory_id',
          to: 'inventory.inventory_id'
        }
      },
      pickingOrderManifest: {
        relation: Model.BelongsToOneRelation,
        modelClass: PickingOrderManifest,
        join: {
          from: 'picks.picking_order_manifest_id',
          to: 'picking_order_manifests.picking_order_manifest_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['inventory_id', 'picking_order_manifest_id'],
      properties: {
        pick_id: { type: 'integer' },
        inventory_id: { type: 'integer' },
        picking_order_manifest_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Pick;
