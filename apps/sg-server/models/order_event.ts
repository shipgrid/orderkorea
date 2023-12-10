import { Model } from 'objection';
import knexClient from './knex_client'
import Order from './order'

Model.knex(knexClient);

interface OrderEvent {
  order_event_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class OrderEvent extends Model implements OrderEvent {
  static get tableName() {
    return 'order_events';
  }

  static get idColumn() {
    return 'order_event_id';
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'order_events.order_id',
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
        order_event_id: { type: ['integer'] },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default OrderEvent;
