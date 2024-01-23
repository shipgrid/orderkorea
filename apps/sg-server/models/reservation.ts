import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'
import Order from './order'

Model.knex(knexClient);

interface Reservation {
  reservation_id: number; 
  order_id?: number;
  vehicle_id: number;
  customer_id: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Reservation extends Model implements Reservation {
  static get tableName() {
    return 'reservations'; 
  }

  static get idColumn() {
    return 'reservation_id';
  }

  static get relationMappings() {
    return {
      vehicle: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vehicle,
        join: {
          from: 'reservations.vehicle_id',
          to: 'vehicles.vehicle_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        reservation_id: { type: 'integer' },
        order_id: { type: 'integer' },
        vehicle_id: { type: 'integer' },
        customer_id: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Reservation;
