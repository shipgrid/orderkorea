import { Model } from 'objection';
import knexClient from './knex_client'
import Vehicle from './vehicle'

Model.knex(knexClient);

interface VehicleImage {
  vehicle_image_id: number;
  vehicle_id: number;
  image_url: string;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class VehicleImage extends Model implements VehicleImage {
  static get tableName() {
    return 'vehicle_images'; 
  }

  static get idColumn() {
    return 'vehicle_image_id';
  }

  static get relationMappings() {
    return {
      vehicles: {
        relation: Model.BelongsToOneRelation,
        modelClass: Vehicle,
        join: {
          from: 'vehicle_images.vehicle_id',
          to: 'vehicles.vehicle_id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['vehicle_id', 'image_url'],

      properties: {
        vehicle_image_id: { type: 'integer' },
        vehicle_id: { type: 'integer' },
        image_url: { type: 'string', minLength: 1, maxLength: 255 },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default VehicleImage;
