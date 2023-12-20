import { Model } from 'objection';
import knexClient from './knex_client';
import Shipment from './shipment';
import PackingOrderManifest from './packing_order_manifest';

Model.knex(knexClient);

interface Pack {
  pack_id: number;
  shipment_id: number;
  packing_order_manifest_id: number;
  packing_instructions: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Pack extends Model implements Pack {
  static get tableName() {
    return 'packs';
  }

  static get idColumn() {
    return 'pack_id';
  }

  static get relationMappings() {
    return {
      shipment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shipment,
        join: {
          from: 'packs.shipment_id',
          to: 'shipments.shipment_id'
        }
      },
      packingOrderManifest: {
        relation: Model.BelongsToOneRelation,
        modelClass: PackingOrderManifest,
        join: {
          from: 'packs.packing_order_manifest_id',
          to: 'packing_order_manifests.packing_order_manifest_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shipment_id', 'packing_order_manifest_id'],
      properties: {
        pack_id: { type: 'integer' },
        shipment_id: { type: 'integer' },
        packing_order_manifest_id: { type: 'integer' },
        packing_instructions: { type: 'string', maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Pack;
