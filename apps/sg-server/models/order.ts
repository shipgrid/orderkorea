import { Model } from 'objection';
import knexClient from './knex_client'
import OrderEvent from './order_event';

Model.knex(knexClient);

interface Order {
  order_id: number;
  customer_id: number | null;
  staff_id: number | null;
  shipment_id: number | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Order extends Model implements Order {
  static get tableName() {
    return 'orders';
  }

  static get idColumn() {
    return 'order_id';
  }

  static get relationMappings() {
    return {
      orderEvents: {
        relation: Model.HasManyRelation,
        modelClass: OrderEvent,
        join: {
          from: 'orders.order_id',
          to: 'order_events.order_id'
        }
      },
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['vehicle_id', 'customer_id'],
      properties: {
        order_id: { type: 'integer' },
        vehicle_id: { type: 'integer' },
        customer_id: { type: ['integer', 'null'] },
        staff_id: { type: ['integer', 'null'] },
        shipment_id: { type: ['integer', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Order;
