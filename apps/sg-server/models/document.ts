import { Model } from 'objection';
import knexClient from './knex_client'

Model.knex(knexClient);

interface Document {
  document_id: number; 
  order_id: number;
  document_url: string; 
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

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'document_url'],
      properties: {
        document_id: { type: 'integer' },
        order_id: { type: 'integer' },
        document_url: { type: 'string' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Document;
