import { Model } from 'objection';
import knexClient from './knex_client'
import ThirdParty from './third_party';

Model.knex(knexClient);

interface ThirdPartyAddress {
  third_party_address_id: number;
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state_code: string;
  country_code: string;
  postal_code: string;
  email: string | null;
  phone: string | null;
  user_id: number | null;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class ThirdPartyAddress extends Model implements ThirdPartyAddress {
  static get tableName() {
    return 'third_party_addresses';
  }

  static get idColumn() {
    return 'third_party_address_id';
  }

  static get relationMappings() {
    return {
      thirdParty: {
        relation: Model.BelongsToOneRelation,
        modelClass: ThirdParty,
        join: {
          from: 'third_party_addresses.third_party_id',
          to: 'third_party.third_party_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'line1', 'city', 'state_code', 'country_code', 'postal_code'],
      properties: {
        third_party_address_id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        line1: { type: 'string', minLength: 1, maxLength: 255 },
        line2: { type: ['string', 'null'], maxLength: 255 },
        city: { type: 'string', minLength: 1, maxLength: 255 },
        state_code: { type: 'string', minLength: 1, maxLength: 45 },
        country_code: { type: 'string', minLength: 1, maxLength: 2 },
        postal_code: { type: 'string', minLength: 1, maxLength: 45 },
        email: { type: ['string', 'null'], maxLength: 255 },
        phone: { type: ['string', 'null'], maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      }
    };
  }
}

export default ThirdPartyAddress;
