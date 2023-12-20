import { Model } from 'objection';
import knexClient from './knex_client';

Model.knex(knexClient);

interface Rule {
  rule_id: number;
  name: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Rule extends Model implements Rule {
  static get tableName() {
    return 'rules';
  }

  static get idColumn() {
    return 'rule_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        rule_id: { type: 'integer' },
        name: { type: 'string', maxLength: 45 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Rule;
