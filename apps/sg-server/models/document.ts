import { Model } from 'objection';
import knexClient from './knex_client'
import Order from './order'
import Address from './address'

Model.knex(knexClient);

interface ThirdParty {
  document_id: number;
  order_id: number;
  file_url: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class ThirdParty extends Model implements ThirdParty {
  static get tableName() {
    return 'documents';
  }

  static get idColumn() {
    return 'document_id';
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'documents.order_id',
          to: 'orders.order_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'name'],
      properties: {
        document_id: { type: ['integer'] },
        order_id: { type: ['integer'] },
        file_url: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default ThirdParty;
