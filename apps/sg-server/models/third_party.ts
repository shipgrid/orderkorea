import { Model } from 'objection';
import knexClient from './knex_client'
import Order from './order'
import Address from './address'

Model.knex(knexClient);

interface ThirdParty {
  third_party_id: number;
  address_id: number;
  order_id: number;
  type: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class ThirdParty extends Model implements ThirdParty {
  static get tableName() {
    return 'third_parties';
  }

  static get idColumn() {
    return 'third_party_id';
  }

  static get relationMappings() {
    return {
      orders: {
        relation: Model.BelongsToOneRelation,
        modelClass: Order,
        join: {
          from: 'third_parties.third_party_id',
          to: 'orders.order_id',
        },
      },
      address: {
        relation: Model.HasOneRelation,
        modelClass: Address,
        join: {
          from: 'third_parties.address_id',
          to: 'addresses.address_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['order_id', 'name'],
      properties: {
        third_party_id: { type: ['integer'] },
        address_id: { type: ['integer'] },
        order_id: { type: ['integer'] },
        type: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default ThirdParty;
