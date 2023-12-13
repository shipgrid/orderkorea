import { Model } from 'objection';
import knexClient from './knex_client'
import VehicleImage from './vehicle_image';

Model.knex(knexClient);

// Define an interface that represents your Vehicle model properties
interface Vehicle {
  vehicle_id: number;
  order_id: string;
  make: string;
  model: string;
  year: string;
  exterior_color: string; 
  vin_number: string | null; 
  transmission_type: string; 
  mileage: string | null; 
  description: string | null; 
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class Vehicle extends Model implements Vehicle {
  static get tableName() {
    return 'vehicles'; 
  }

  static get idColumn() {
    return 'vehicle_id';
  }

  static get relationMappings() {
    return {
      images: {
        relation: Model.HasManyRelation,
        modelClass: VehicleImage,
        join: {
          from: 'vehicles.vehicle_id',
          to: 'vehicle_images.vehicle_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['make', 'model', 'year', 'exterior_color', 'transmission_type'],

      properties: {
        vehicle_id: { type: 'integer' },
        order_id: { type: 'integer' },
        make: { type: 'string', minLength: 1, maxLength: 255 },
        model: { type: 'string', minLength: 1, maxLength: 255 },
        year: { type: 'string', minLength: 1, maxLength: 255 },
        exterior_color: { type: 'string', minLength: 1, maxLength: 255 },
        vin_number: { type: 'string', minLength: 1, maxLength: 255 },
        transmission_type: { type: 'string', minLength: 1, maxLength: 255 },
        mileage: { type: 'number' },
        description: { type: 'string' },
        last_login: { type: ['string', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Vehicle;
