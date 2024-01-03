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
  price: string;
  mileage: string; 
  exterior_color: string; 
  interior_color: string; 
  transmission_type: string; 
  doors: number; 
  trim: string; 
  drivetrain: string 
  vin_number: string | null; 
  is_new: boolean; 
  fuel_type: string; 
  description: string; 
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
      required: ['make', 'model', 'year', 'price', 'mileage', 'exterior_color', 'interior_color', 'transmission_type', 'doors', 'trim', 'drivetrain', 'description', 'fuel_type' ],
      properties: {
        vehicle_id: { type: 'integer' },
        order_id: { type: 'integer' },
        make: { type: 'string', minLength: 1, maxLength: 255 },
        model: { type: 'string', minLength: 1, maxLength: 255 },
        year: { type: 'string', minLength: 1, maxLength: 255 },
        price: { type: 'number' },
        mileage: { type: 'number' },
        exterior_color: { type: 'string', minLength: 1, maxLength: 255 },
        interior_color: { type: 'string', minLength: 1, maxLength: 255 },
        transmission_type: { type: 'string', minLength: 1, maxLength: 255 },
        doors: { type: 'integer', minLength: 2, maxLength: 5 },
        trim: { type: 'string', minLength: 1, maxLength: 255 },
        drivetrain: { type: 'string', minLength: 1, maxLength: 255 },
        vin_number: { type: ['string', 'null'], minLength: 1, maxLength: 255 },
        is_new: { type: 'boolean' },
        description: { type: 'string' },
        fuel_type: { type: 'string' },
        last_login: { type: ['string', 'null'] },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default Vehicle;
