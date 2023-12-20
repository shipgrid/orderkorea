import { Model } from 'objection';
import knexClient from './knex_client'
import Sku from './sku'

Model.knex(knexClient);

interface RateCard {
  rate_card_id: number; 
  created_on: string;
  updated_on: string;
  deleted_on: string | null; // Assuming deleted_on can be null
}

class RateCard extends Model implements RateCard {
  static get tableName() {
    return 'rate_card';
  }

  static get idColumn() {
    return 'rate_card_id';
  }

  static get relationMappings() {
    return {
      skus: {
        relation: Model.ManyToManyRelation,
        modelClass: Sku,
        join: {
          from: 'orders.rate_card_id',
          through: {
            from: 'order_sku.rate_card_id',
            to: 'order_sku.sku_id'
          },
          to: 'sku.sku_id'
        }
      }
    }
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

export default RateCard;
