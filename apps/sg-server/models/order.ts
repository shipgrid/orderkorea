import { Model } from 'objection';
import knexClient from './knex_client'
import OrderEvent from './order_event';
import ThirdParty from './third_party'
import Document from './document'
import Vehicle from './vehicle'

Model.knex(knexClient);

interface Order {
  order_id: number;
  seller_id: number;
  buyer_id: number;
  shipment_type: string;
  port_of_loading: string | null;
  container_number: string | null;
  port_of_arrival: string | null;
  expected_arrival: string | null;
  loaded_on: string | null;
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
      thirdParties: {
        relation: Model.HasManyRelation,
        modelClass: ThirdParty,
        join: {
          from: 'orders.order_id',
          to: 'third_parties.order_id'
        }
      },
      documents: {
        relation: Model.HasManyRelation,
        modelClass: Document,
        join: {
          from: 'orders.order_id',
          to: 'documents.order_id'
        }
      },
      vehicles: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'orders.order_id',
          to: 'vehicles.order_id'
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        order_id: { type: 'integer' },
        seller_id: { type: 'integer' },
        buyer_id: { type: ['integer', 'null'] },
        shipment_type: { type: 'string', maxLength: 255 },
        port_of_loading: { type: ['string', 'null'], maxLength: 255 },
        container_number: { type: ['string', 'null'], maxLength: 255 },
        port_of_arrival: { type: ['string', 'null'], maxLength: 255 },
        loaded_on: { type: ['string', 'null'], maxLength: 255 },
        expected_arrival: { type: ['string', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Order;
