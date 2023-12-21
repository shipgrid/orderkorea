import { Model } from 'objection';
import knexClient from './knex_client';
import ShipmentOrderManifest from './shipment_order_manifest';

Model.knex(knexClient);

interface Shipment {
  shipment_id: number;
  shipment_order_manifest_id: number;
  shipment_date: string;
  length: number;
  width: number;
  height: number;
  unit_type: string;
  shipment_status: string;
  tracking: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Shipment extends Model implements Shipment {
  static get tableName() {
    return 'shipments';
  }

  static get idColumn() {
    return 'shipment_id';
  }

  static get relationMappings() {
    return {
      shipmentOrderManifest: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShipmentOrderManifest,
        join: {
          from: 'shipments.shipment_order_manifest_id',
          to: 'shipment_order_manifests.shipment_order_manifest_id'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shipment_order_manifest_id', 'shipment_date'],
      properties: {
        shipment_id: { type: 'integer' },
        shipment_order_manifest_id: { type: 'integer' },
        shipment_date: { type: 'string' },
        length: { type: 'number' },
        width: { type: 'number' },
        height: { type: 'number' },
        unit_type: { type: 'string', enum: ['metric', 'imperial'] },
        shipment_status: { type: 'string', enum: ['created'] },
        tracking: { type: 'string', maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] }
      }
    };
  }
}

export default Shipment;
