import { Model } from 'objection';
import knexClient from './knex_client';
import Shipment from './shipment';
import ShipmentMethod from './shipment_method';
import ShipmentAddress from './shipment_address';
import Warehouse from './warehouse';

Model.knex(knexClient);

interface ShipmentRate {
  shipment_id: number;
  shipment_method_id: number;
  shipment_address_id: number;
  warehouse_id: number;
  purchase_price: number;
  internal_price: number;
  eta_min_days: number;
  eta_max_days: number;
  created_on: string;
  updated_on: string;
  deleted_on: string | null;
}

class ShipmentRate extends Model implements ShipmentRate {
  static get tableName() {
    return 'shipment_rates';
  }

  static get idColumn() {
    return ['shipment_id', 'shipment_method_id', 'shipment_address_id', 'warehouse_id'];
  }

  static get relationMappings() {
    return {
      shipment: {
        relation: Model.BelongsToOneRelation,
        modelClass: Shipment,
        join: {
          from: 'shipment_rates.shipment_id',
          to: 'shipments.shipment_id'
        }
      },
      shipmentMethod: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShipmentMethod,
        join: {
          from: 'shipment_rates.shipment_method_id',
          to: 'shipment_methods.shipment_method_id'
        }
      },
      shipmentAddress: {
        relation: Model.BelongsToOneRelation,
        modelClass: ShipmentAddress,
        join: {
          from: 'shipment_rates.shipment_address_id',
          to: 'shipment_addresses.shipment_address_id'
        }
      },
      warehouse: {
        relation: Model.BelongsToOneRelation,
        modelClass: Warehouse,
        join: {
          from: 'shipment_rates.warehouse_id',
          to: 'warehouses.warehouse_id'
        }
      }
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['shipment_id', 'shipment_method_id', 'shipment_address_id', 'warehouse_id'],
      properties: {
        shipment_id: { type: 'integer' },
        shipment_method_id: { type: 'integer' },
        shipment_address_id: { type: 'integer' },
        warehouse_id: { type: 'integer' },
        purchase_price: { type: 'number' },
        internal_price: { type: 'number' },
        eta_min_days: { type: 'integer' },
        eta_max_days: { type: 'integer' },
        created_on: { type: 'string' },
        updated_on: { type: 'string' },
        deleted_on: { type: ['string', 'null'] }
      }
    };
  }
}

export default ShipmentRate;
