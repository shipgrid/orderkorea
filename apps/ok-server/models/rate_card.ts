import { Model } from 'objection';
import knexClient from './knex_client';

Model.knex(knexClient);

interface RateCard {
  rate_card_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class RateCard extends Model implements RateCard {
  static get tableName() {
    return 'rate_cards';
  }

  static get idColumn() {
    return 'rate_card_id';
  }
  
  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        rate_card_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default RateCard;
