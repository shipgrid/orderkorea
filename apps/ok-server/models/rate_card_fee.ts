import { Model } from 'objection';
import knexClient from './knex_client';
import RateCard from './rate_card';
import Fee from './fee';

Model.knex(knexClient);

interface RateCardFee {
  rate_card_fee_id: number;
  rate_card_id: number;
  fee_id: number;
  amount: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class RateCardFee extends Model implements RateCardFee {
  static get tableName() {
    return 'rate_card_fees';
  }

  static get idColumn() {
    return 'rate_card_fee_id';
  }

  static get relationMappings() {
    return {
      rateCard: {
        relation: Model.BelongsToOneRelation,
        modelClass: RateCard,
        join: {
          from: 'rate_card_fees.rate_card_id',
          to: 'rate_cards.rate_card_id'
        }
      },
      fee: {
        relation: Model.BelongsToOneRelation,
        modelClass: Fee,
        join: {
          from: 'rate_card_fees.fee_id',
          to: 'fees.fee_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['rate_card_id', 'fee_id', 'amount'],
      properties: {
        rate_card_fee_id: { type: 'integer' },
        rate_card_id: { type: 'integer' },
        fee_id: { type: 'integer' },
        amount: { type: 'number' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default RateCardFee;
