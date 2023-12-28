import { Model } from 'objection';
import knexClient from './knex_client'
import Order from './order'

Model.knex(knexClient);

interface Document {
  document_id: number;
  order_id: number;
  name: string;
  file_url: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Document extends Model implements Document {
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
      required: ['order_id', 'name', 'file_url'],
      properties: {
        document_id: { type: ['integer'] },
        order_id: { type: ['integer'] },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        file_url: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Document;
