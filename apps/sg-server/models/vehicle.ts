import { Model } from 'objection';
import knexClient from './knex_client'
import VehicleImage from './vehicle_image';
import VehicleModel from './model';
import Make from './make';
import Trim from './trim';
import BodyStyle from './body_style';
import FuelType from './fuel_type';
import Door from './door';
import Transmission from './transmission';
import Color from './color';
import Drivetrain from './drivetrain';

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
  is_new: number; 
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
      exterior_color: {
        relation: Model.BelongsToOneRelation,
        modelClass: Color,
        join: {
          from: 'vehicles.exterior_color_id',
          to: 'colors.color_id',
        },
      },
      interior_color: {
        relation: Model.BelongsToOneRelation,
        modelClass: Color,
        join: {
          from: 'vehicles.interior_color_id',
          to: 'colors.color_id',
        },
      },
      make: {
        relation: Model.BelongsToOneRelation,
        modelClass: Make,
        join: {
          from: 'vehicles.make_id',
          to: 'makes.make_id',
        },
      },
      model: {
        relation: Model.BelongsToOneRelation,
        modelClass: VehicleModel,
        join: {
          from: 'vehicles.model_id',
          to: 'models.model_id',
        }
      },
      trim: {
        relation: Model.BelongsToOneRelation,
        modelClass: Trim,
        join: {
          from: 'vehicles.trim_id',
          to: 'trims.trim_id',
        }
      },
      body_style: {
        relation: Model.BelongsToOneRelation,
        modelClass: BodyStyle,
        join: {
          from: 'vehicles.body_style_id',
          to: 'body_styles.body_style_id',
        }
      },
      fuel_type: {
        relation: Model.BelongsToOneRelation,
        modelClass: FuelType,
        join: {
          from: 'vehicles.fuel_type_id',
          to: 'fuel_types.fuel_type_id',
        }
      },
      transmission: {
        relation: Model.BelongsToOneRelation,
        modelClass: Transmission,
        join: {
          from: 'vehicles.transmission_id',
          to: 'transmissions.transmission_id',
        }
      },
      drivetrain: {
        relation: Model.BelongsToOneRelation,
        modelClass: Drivetrain,
        join: {
          from: 'vehicles.drivetrain_id',
          to: 'drivetrains.drivetrain_id',
        }
      },
      doors: {
        relation: Model.BelongsToOneRelation,
        modelClass: Door,
        join: {
          from: 'vehicles.door_id',
          to: 'doors.door_id',
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'make', 
        'model', 
        'year', 
        'price', 
        'mileage', 
        'exterior_color', 
        'transmission_type', 
        'description', 
        'fuel_type' 
      ],
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
        is_new: { type: 'number' },
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
