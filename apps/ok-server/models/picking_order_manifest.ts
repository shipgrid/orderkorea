import { Model } from 'objection';
import knexClient from './knex_client';
import UserStaff from './user_staff';

Model.knex(knexClient);

interface PickingOrderManifest {
  picking_order_manifest_id: number;
  staff_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class PickingOrderManifest extends Model implements PickingOrderManifest {
  static get tableName() {
    return 'picking_order_manifests';
  }

  static get idColumn() {
    return 'picking_order_manifest_id';
  }

  static get relationMappings() {
    return {
      staff: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserStaff,
        join: {
          from: 'picking_order_manifests.staff_id',
          to: 'user_staff.staff_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['staff_id'],
      properties: {
        picking_order_manifest_id: { type: 'integer' },
        staff_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default PickingOrderManifest;
