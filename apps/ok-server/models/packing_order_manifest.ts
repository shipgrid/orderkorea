import { Model } from 'objection';
import knexClient from './knex_client';
import UserStaff from './user_staff';

Model.knex(knexClient);

interface PackingOrderManifest {
  packing_order_manifest_id: number;
  staff_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class PackingOrderManifest extends Model implements PackingOrderManifest {
  static get tableName() {
    return 'packing_order_manifests';
  }

  static get idColumn() {
    return 'packing_order_manifest_id';
  }

  static get relationMappings() {
    return {
      staff: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserStaff,
        join: {
          from: 'packing_order_manifests.staff_id',
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
        packing_order_manifest_id: { type: 'integer' },
        staff_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default PackingOrderManifest;
