import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Fee {
  fee_id: number; 
  vehicle_price: number;
  service_fee: number;
  delivery_fee: number | null;
  deposit_percentage: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Fee extends Model implements Fee {
  static get tableName() {
    return 'fees'; 
  }

  static get idColumn() {
    return 'fee_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.HasManyRelation,
        modelClass: Vehicle,
        join: {
          from: 'fees.fee_id',
          to: 'vehicles.fee_id',
        },
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'name',
      ],
      properties: {
        fee_id: { type: 'integer' },
        vehicle_price: { type: 'float' },
        delivery_fee: { type: 'float' },
        service_fee: { type: 'float' },
        deposit_percentage: { type: 'float' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Fee;
