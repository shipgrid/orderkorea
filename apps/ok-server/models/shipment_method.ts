import { Model } from 'objection';
import knexClient from './knex_client';

Model.knex(knexClient);

interface ShipmentMethod {
  shipment_method_id: number;
  carrier: string;
  service_code: string;
  description: string;
  weight_min: number;
  weight_max: number;
  length_min: number;
  length_max: number;
  width_min: number;
  width_max: number;
  height_min: number;
  height_max: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class ShipmentMethod extends Model implements ShipmentMethod{
  static get tableName() {
    return 'shipment_methods';
  }

  static get idColumn() {
    return 'shipment_method_id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        shipment_method_id: { type: 'integer' },
        carrier: { type: 'string', maxLength: 255 },
        service_code: { type: 'string', maxLength: 255 },
        description: { type: 'string', maxLength: 255 },
        weight_min: { type: 'number' },
        weight_max: { type: 'number' },
        length_min: { type: 'number' },
        length_max: { type: 'number' },
        width_min: { type: 'number' },
        width_max: { type: 'number' },
        height_min: { type: 'number' },
        height_max: { type: 'number' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] },
      },
    };
  }
}

export default ShipmentMethod;
