// Order.js

import { Model } from 'objection';
import knexClient from './knex_client';
import Sku from './sku';
import OrderSku from './order_sku';

Model.knex(knexClient);

class Order extends Model {
  static get tableName() {
    return 'orders';
  }

  static get idColumn() {
    return 'order_id';
  }

  static get relationMappings() {
    return {
      skus: {
        relation: Model.ManyToManyRelation,
        modelClass: Sku,
        join: {
          from: 'orders.order_id',
          through: {
            from: 'order_sku.order_id',
            to: 'order_sku.sku_id',
          },
          to: 'skus.sku_id',
        },
      },
      order_skus: {
        relation: Model.HasManyRelation,
        modelClass: OrderSku,
        join: {
          from: 'orders.order_id',
          to: 'order_sku.order_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['type', 'customer_id'],
      properties: {
        order_id: { type: 'integer' },
        type: { type: 'string' },
        staff_id: { type: ['integer', 'null'] },
        customer_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Order;
