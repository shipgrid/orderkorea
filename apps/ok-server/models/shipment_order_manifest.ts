import { Model } from 'objection';
import knexClient from './knex_client';
import UserStaff from './user_staff';
import PackingOrderManifest from './packing_order_manifest';
import PickingOrderManifest from './picking_order_manifest';

Model.knex(knexClient);

interface ShipmentOrderManifest {
  shipment_order_manifest_id: number;
  staff_id: number;
  packing_order_manifest_id: number;
  picking_order_manifest_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}


class ShipmentOrderManifest extends Model implements ShipmentOrderManifest {
  static get tableName() {
    return 'shipment_order_manifests';
  }

  static get idColumn() {
    return 'shipment_order_manifest_id';
  }

  static get relationMappings() {
    return {
      staff: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserStaff,
        join: {
          from: 'shipment_order_manifests.staff_id',
          to: 'user_staff.staff_id'
        }
      },
      packingOrderManifest: {
        relation: Model.BelongsToOneRelation,
        modelClass: PackingOrderManifest,
        join: {
          from: 'shipment_order_manifests.packing_order_manifest_id',
          to: 'packing_order_manifests.packing_order_manifest_id'
        }
      },
      pickingOrderManifest: {
        relation: Model.BelongsToOneRelation,
        modelClass: PickingOrderManifest,
        join: {
          from: 'shipment_order_manifests.picking_order_manifest_id',
          to: 'picking_order_manifests.picking_order_manifest_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['staff_id', 'packing_order_manifest_id', 'picking_order_manifest_id'],
      properties: {
        shipment_order_manifest_id: { type: 'integer' },
        staff_id: { type: 'integer' },
        packing_order_manifest_id: { type: 'integer' },
        picking_order_manifest_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default ShipmentOrderManifest;
