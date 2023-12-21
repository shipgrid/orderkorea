import { Model } from 'objection';
import knexClient from './knex_client';
import RateCard from './rate_card';
import Rule from './rule';

Model.knex(knexClient);

interface RateCardRule {
  rate_card_rule_id: number;
  rate_card_id: number;
  rule_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class RateCardRule extends Model implements RateCardRule {
  static get tableName() {
    return 'rate_card_rules';
  }

  static get idColumn() {
    return 'rate_card_rule_id';
  }

  static get relationMappings() {
    return {
      rateCard: {
        relation: Model.BelongsToOneRelation,
        modelClass: RateCard,
        join: {
          from: 'rate_card_rules.rate_card_id',
          to: 'rate_cards.rate_card_id'
        }
      },
      rule: {
        relation: Model.BelongsToOneRelation,
        modelClass: Rule,
        join: {
          from: 'rate_card_rules.rule_id',
          to: 'rules.rule_id'
        }
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['rate_card_id', 'rule_id'],
      properties: {
        rate_card_rule_id: { type: 'integer' },
        rate_card_id: { type: 'integer' },
        rule_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default RateCardRule;
