import { Model } from 'objection';
import knexClient from './knex_client'
import Order from './order'
import Sku from './sku'

Model.knex(knexClient);

interface OrderSku {
  sku_id: string;
  order_id: number;
  quantity: number;
  quantity_received: number;
  contact_email: string;
  contact_phone: string;
  contact_name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null; // Assuming deleted_on can be null
}

class OrderSku extends Model implements OrderSku {
  static get tableName() {
    return 'order_sku';
  }

  static get idColumn() {
    return ['order_id', 'sku_id'];
  }

  static get relationMappings() {
    return {
      order: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_sku.order_id',
          to: 'order.id',
        },
      },
      sku: {
        relation: Model.BelongsToOneRelation,
        modelClass: Sku,
        join: {
          from: 'order_sku.sku_id',
          to: 'sku.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'sku_id', 'quantity' ],
      properties: {
        sku_id: { type: 'string', minLength: 1, maxLength: 255 },
        order_id: { type: 'integer' },
        quantity: { type: 'integer' },
        quantity_received: { type: 'integer' },
        contact_email: { type: 'string', minLength: 1, maxLength: 255 },
        contact_phone: { type: 'string', minLength: 1, maxLength: 255 },
        contact_name: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default OrderSku;
